import Card, { CardStatistics } from './Card';
import { cardContentFactory } from './content/cardContentFactory';

export type CardRaw = {
  id?: number | undefined;
  deck_id: number;
  question: string;
  content: object;
  template_type: number;
  statistics: CardStatistics;
  is_active: number;
  seen_at: Date;
  updated_at: Date;
  created_at: Date;
};

export type CardTagRaw = {
  card_id: number;
  tag_id: number;
  deck_id: number;
};

export const serializeCard = (card: Card): CardRaw => ({
  id: card.isExists() ? card.getId() : undefined,
  deck_id: card.getDeckId(),
  question: card.getQuestion(),
  content: card.getContent().serialize(),
  template_type: card.getTemplateType(),
  statistics: card.getStatistics(),
  is_active: +card.getIsActive(),
  seen_at: card.getSeenAt(),
  updated_at: card.getUpdatedAt(),
  created_at: card.getCreatedAt(),
});

export const unserializeCard = (raw: CardRaw): Card =>
  new Card(
    undefined !== raw.id ? raw.id : undefined,
    raw.deck_id,
    raw.question,
    cardContentFactory(raw.content, raw.template_type),
    raw.template_type,
    raw.statistics,
    !!raw.is_active,
    raw.seen_at,
    raw.updated_at,
    raw.created_at,
  );
