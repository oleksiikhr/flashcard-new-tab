import CardContentFactory from './Content/CardContentFactory';
import CardStatistics, { CardStatisticsRaw } from './CardStatistics';
import Card from './Card';
import CardTemplateType from './CardTemplateType';
import CardId from './CardId';
import DeckId from '../Deck/DeckId';
import CardQuestion from './CardQuestion';

export type CardRaw = {
  id: number | undefined;
  deck_id: number;
  question: string;
  content: object;
  template_type: number;
  statistics: CardStatisticsRaw;
  is_active: number;
  seen_at: Date;
  updated_at: Date;
  created_at: Date;
};

export default class CardMemento {
  constructor(private contentFactory: CardContentFactory) {}

  public serialize(card: Card): CardRaw {
    return {
      id: card.isExists() ? card.getId().getIdentifier() : undefined,
      deck_id: card.getDeckId().getIdentifier(),
      question: card.getQuestion().getValue(),
      content: card.getContent().serialize(),
      template_type: card.getTemplateType().getValue(),
      statistics: card.getStatistics().serialize(),
      is_active: +card.getIsActive(),
      seen_at: card.getSeenAt(),
      updated_at: card.getUpdatedAt(),
      created_at: card.getCreatedAt(),
    };
  }

  public unserialize(raw: CardRaw): Card {
    const templateType = new CardTemplateType(raw.template_type);

    return new Card(
      undefined !== raw.id ? CardId.of(raw.id) : undefined,
      DeckId.of(raw.deck_id),
      new CardQuestion(raw.question),
      this.contentFactory.make(raw.content, templateType),
      templateType,
      new CardStatistics(raw.statistics),
      !!raw.is_active,
      raw.seen_at,
      raw.updated_at,
      raw.created_at,
    );
  }
}
