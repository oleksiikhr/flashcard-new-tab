import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import Card from '../../../Domain/Card/Card';
import DeckId from '../../../Domain/Deck/DeckId';
import CardQuestion from '../../../Domain/Card/CardQuestion';
import CardContentFactory from '../../../Domain/Card/Content/CardContentFactory';
import CardTemplateType from '../../../Domain/Card/CardTemplateType';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';
import Tag from '../../../Domain/Tag/Tag';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import TagCommandRepository from '../../../Domain/Tag/Repository/TagCommandRepository';
import TagName from '../../../Domain/Tag/TagName';

export type ImportRaw = {
  question: string;
  content: object;
  template_type: number;
  is_active: boolean;
  tags: string[];
};

export default class ImportCardsHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private tagCommandRepository: TagCommandRepository,
    private cardQueryRepository: CardQueryRepository,
    private deckQueryRepository: DeckQueryRepository,
    private tagQueryRepository: TagQueryRepository,
    private contentFactory: CardContentFactory,
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

    const tagsMap = await this.getUniqueTags(deck.getId(), raws);

    const promises = raws.map((raw) => {
      const templateType = new CardTemplateType(raw.template_type);
      const question = new CardQuestion(raw.question);
      const content = this.contentFactory.make(raw.content, templateType);
      const tags = raw.tags.map((tagName) => tagsMap.get(tagName)) as Tag[];

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

          card.from(question, content, raw.is_active);

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

  private async getUniqueTags(
    deckId: DeckId,
    raws: ImportRaw[],
  ): Promise<Map<string, Tag>> {
    const tagNames: Set<string> = new Set();

    raws.forEach((raw) => {
      raw.tags.forEach((tagName) => {
        tagNames.add(tagName);
      });
    });

    const promises: Promise<Tag>[] = [];

    tagNames.forEach((tagName) => {
      const promise = this.tagQueryRepository
        .findByDeckIdAndName(deckId, new TagName(tagName))
        .then((tag) => {
          if (undefined !== tag) {
            return Promise.resolve(tag);
          }

          const newTag = Tag.create(deckId, new TagName(tagName));

          return this.tagCommandRepository
            .create(Tag.create(deckId, new TagName(tagName)))
            .then(() => newTag);
        });

      promises.push(promise);
    });

    const tags = await Promise.all(promises);
    const tagsMap: Map<string, Tag> = new Map();

    tags.forEach((tag) => {
      tagsMap.set(tag.getName().getValue(), tag);
    });

    return tagsMap;
  }
}
