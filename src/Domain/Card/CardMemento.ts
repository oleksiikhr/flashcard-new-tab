import CardContentFactory from './Content/CardContentFactory';
import CardStatistics, { CardStatisticsRaw } from './CardStatistics';
import Card from './Card';
import CardTemplateType from './CardTemplateType';
import CardId from './CardId';
import DeckId from '../Deck/DeckId';
import CardQuestion from './CardQuestion';
import DeckQueryRepository from '../Deck/Repository/DeckQueryRepository';
import TagQueryRepository from '../Tag/Repository/TagQueryRepository';
import Tag from '../Tag/Tag';
import TagId from '../Tag/TagId';

export type CardRaw = {
  id: number | undefined;
  deck_id: number;
  question: string;
  content: object;
  template_type: number;
  statistics: CardStatisticsRaw;
  next_at: Date;
  seen_at: Date;
  updated_at: Date;
  created_at: Date;
  tagIds: number[];
};

export default class CardMemento {
  constructor(
    private deckQueryRepository: DeckQueryRepository,
    private tagQueryRepository: TagQueryRepository,
    private contentFactory: CardContentFactory,
  ) {}

  public serialize(card: Card): CardRaw {
    return {
      id: card.getId().getIdentifier(),
      deck_id: card.getDeck().getId().getIdentifier(),
      question: card.getQuestion().getValue(),
      content: card.getContent().serialize(),
      template_type: card.getTemplateType().getValue(),
      statistics: card.getStatistics().serialize(),
      next_at: card.getNextAt(),
      seen_at: card.getSeenAt(),
      updated_at: card.getUpdatedAt(),
      created_at: card.getCreatedAt(),
      tagIds: card.getTags().map((tag) => tag.getId()?.getIdentifier()), // TODO Store
    };
  }

  public async unserialize(raw: CardRaw): Promise<Card> {
    let tags: Tag[] = [];
    const deck = await this.deckQueryRepository.findById(
      DeckId.of(raw.deck_id),
    );

    if (undefined === deck) {
      throw new Error(''); // TODO
    }

    if ([] !== raw.tagIds) {
      tags = await this.tagQueryRepository.findByIds(
        raw.tagIds.map((tagId) => TagId.of(tagId)),
      );
    }

    const templateType = new CardTemplateType(raw.template_type);

    return new Card(
      undefined !== raw.id ? CardId.of(raw.id) : undefined,
      deck,
      new CardQuestion(raw.question),
      this.contentFactory.make(raw.content, templateType),
      templateType,
      new CardStatistics(raw.statistics),
      raw.next_at,
      raw.seen_at,
      raw.updated_at,
      raw.created_at,
      tags,
    );
  }
}
