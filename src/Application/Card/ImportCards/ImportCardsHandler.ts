import CardCommandRepository from '../../../Domain/Modules/Card/Repository/CardCommandRepository';
import Card from '../../../Domain/Modules/Card/Card';
import DeckId from '../../../Domain/Modules/Deck/DeckId';
import CardContentFactory from '../../../Domain/Modules/Card/Content/CardContentFactory';
import CardTemplateType from '../../../Domain/Modules/Card/ValueObject/CardTemplateType';
import DomainNotExistsError from '../../../Domain/Error/DomainNotExistsError';
import Tag from '../../../Domain/Modules/Tag/Tag';
import DeckQueryRepository from '../../../Domain/Modules/Deck/Repository/DeckQueryRepository';
import CardQueryRepository from '../../../Domain/Modules/Card/Repository/CardQueryRepository';
import TagQueryRepository from '../../../Domain/Modules/Tag/Repository/TagQueryRepository';
import TagCommandRepository from '../../../Domain/Modules/Tag/Repository/TagCommandRepository';

export type ImportRaw = {
  question: string;
  content: object;
  template_type: number;
  is_active?: boolean;
  tags?: string[];
};

export default class ImportCardsHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private tagCommandRepository: TagCommandRepository,
    private cardQueryRepository: CardQueryRepository,
    private deckQueryRepository: DeckQueryRepository,
    private tagQueryRepository: TagQueryRepository,
    private cardContentFactory: CardContentFactory,
  ) {}

  public async invoke(
    deckId: number,
    raws: ImportRaw[],
    cb?: (card: Card) => void,
  ): Promise<Card[]> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotExistsError(DeckId.of(deckId));
    }

    const tagsMap = await this.uniqueTags(deck.getId(), raws);

    const promises = raws.map((raw) => {
      const templateType = new CardTemplateType(raw.template_type);
      const { question } = raw;
      const content = this.cardContentFactory.make(raw.content, templateType);
      const tags = (raw.tags || []).map((tagName) =>
        tagsMap.get(tagName),
      ) as Tag[];

      return this.cardQueryRepository
        .findByQuestion(question)
        .then((card) => {
          if (undefined === card) {
            const newCard = Card.create(
              DeckId.of(deckId),
              question,
              content,
              templateType,
              raw.is_active,
            );

            return this.cardCommandRepository
              .create(newCard)
              .then(() => newCard);
          }

          card.update(question, content, raw.is_active ?? card.getIsActive());

          return this.cardCommandRepository.update(card).then(() => card);
        })
        .then((card) => {
          if (tags.length) {
            return this.cardCommandRepository
              .syncTags(card, tags)
              .then(() => card);
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
  }

  private async uniqueTags(
    deckId: DeckId,
    raws: ImportRaw[],
  ): Promise<Map<string, Tag>> {
    const tagNames: Set<string> = new Set();

    raws.forEach((raw) => {
      (raw.tags || []).forEach((tagName) => {
        tagNames.add(tagName);
      });
    });

    const promises: Promise<Tag>[] = [];

    tagNames.forEach((tagName) => {
      const promise = this.tagQueryRepository
        .findByDeckIdAndName(deckId, tagName)
        .then(async (tag) => {
          if (undefined !== tag) {
            return Promise.resolve(tag);
          }

          const newTag = await Tag.create(
            deckId,
            tagName,
            this.tagQueryRepository,
          );

          return this.tagCommandRepository.create(newTag).then(() => newTag);
        });

      promises.push(promise);
    });

    const tags = await Promise.all(promises);
    const tagsMap: Map<string, Tag> = new Map();

    tags.forEach((tag) => {
      tagsMap.set(tag.getName(), tag);
    });

    return tagsMap;
  }
}
