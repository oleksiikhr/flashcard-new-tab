import Card, { CardTemplateType } from '../model/Card';
import Tag from '../../tag/model/Tag';
import { findCardByQuestionRequest } from '../database/requests/findCardByQuestionRequest';
import { createCardRequest } from '../database/requests/createCardRequest';
import { updateCardRequest } from '../database/requests/updateCardRequest';
import { syncCardTagsRequest } from '../database/requests/syncCardTagsRequest';
import { createTagRequest } from '../../tag/database/requests/createTagRequest';
import { findTagByDeckIdAndNameRequest } from '../../tag/database/requests/findTagByDeckIdAndNameRequest';
import { cardContentFactory } from '../model/content/cardContentFactory';
import { findDeckByIdRequest } from '../../deck/database/requests/findDeckByIdRequest';

export type ImportRaw = {
  question: string;
  content: object;
  template_type: number;
  is_active?: boolean;
  tags?: string[];
};

const uniqueTags = async (
  deckId: number,
  raws: ImportRaw[],
): Promise<Map<string, Tag>> => {
  const tagNames: Set<string> = new Set();

  raws.forEach((raw) => {
    (raw.tags || []).forEach((tagName) => {
      tagNames.add(tagName);
    });
  });

  const promises: Promise<Tag>[] = [];

  tagNames.forEach((tagName) => {
    // TODO and catch exception
    const promise = findTagByDeckIdAndNameRequest(deckId, tagName).then(
      async (tag) => {
        if (undefined !== tag) {
          return Promise.resolve(tag);
        }

        const newTag = await Tag.create(deckId, tagName);

        return createTagRequest(newTag).then(() => newTag);
      },
    );

    promises.push(promise);
  });

  const tags = await Promise.all(promises);
  const tagsMap: Map<string, Tag> = new Map();

  tags.forEach((tag) => {
    tagsMap.set(tag.getName(), tag);
  });

  return tagsMap;
};

export const importCards = async (
  deckId: number,
  raws: ImportRaw[],
  cb?: (card: Card) => void,
): Promise<Card[]> => {
  const deck = await findDeckByIdRequest(deckId);

  if (undefined === deck) {
    throw new Error('Deck not found.');
  }

  const tagsMap = await uniqueTags(deck.getId(), raws);

  const promises = raws.map((raw) => {
    const { question } = raw;
    const content = cardContentFactory(
      raw.content,
      CardTemplateType.VOCABULARY,
    );
    const tags = (raw.tags || []).map((tagName) =>
      tagsMap.get(tagName),
    ) as Tag[];

    return findCardByQuestionRequest(question)
      .then((card) => {
        if (undefined === card) {
          const newCard = Card.create(
            deckId,
            question,
            content,
            CardTemplateType.VOCABULARY,
            raw.is_active,
          );

          return createCardRequest(newCard).then(() => newCard);
        }

        card.update(question, content, raw.is_active ?? card.getIsActive());

        return updateCardRequest(card).then(() => card);
      })
      .then((card) => {
        if (tags.length) {
          return syncCardTagsRequest(card, tags).then(() => card);
        }

        return Promise.resolve(card);
      })
      .then((card) => {
        if (undefined !== cb) {
          cb(card);
        }

        return card;
      });
  });

  return Promise.all(promises);
};
