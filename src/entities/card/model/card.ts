import { CardContent, cardContentFactory } from './content/cardContentFactory';
import { createIdentifier } from '../../../shared/util/identifier';

export type Card = {
  id: string;
  deckId: string;
  question: string;
  content: CardContent;
  templateType: CardTemplateType;
  statistics: CardStatistics;
  isActive: boolean;
  originalIsActive: boolean;
  seenAt: Date;
  updatedAt: Date;
  createdAt: Date;
};

export type CardStatistics = {
  views: number;
  clicks: number;
};

export enum CardTemplateType {
  VOCABULARY,
}

export type CardSerialized = {
  id: string;
  deck_id: string;
  question: string;
  content: object;
  template_type: number;
  statistics: CardStatistics;
  is_active: number;
  seen_at: Date;
  updated_at: Date;
  created_at: Date;
};

export type CardTag = {
  card_id: string;
  tag_id: string;
  deck_id: string;
};

export const serializeCard = (card: Card): CardSerialized => ({
  id: card.id,
  deck_id: card.deckId,
  question: card.question,
  content: card.content.serialize(),
  template_type: card.templateType,
  statistics: card.statistics,
  is_active: +card.isActive,
  seen_at: card.seenAt,
  updated_at: card.updatedAt,
  created_at: card.createdAt,
});

export const unserializeCard = (raw: CardSerialized): Card => ({
  id: raw.id,
  deckId: raw.deck_id,
  question: raw.question,
  content: cardContentFactory(raw.content, raw.template_type),
  templateType: raw.template_type,
  statistics: raw.statistics,
  isActive: !!raw.is_active,
  originalIsActive: !!raw.is_active,
  seenAt: raw.seen_at,
  updatedAt: raw.updated_at,
  createdAt: raw.created_at,
});

export const createCardModel = (
  deckId: string,
  question: string,
  content: CardContent,
  templateType: CardTemplateType,
  isActive: boolean,
): Card => ({
  id: createIdentifier(),
  deckId,
  question,
  content,
  templateType,
  statistics: { views: 0, clicks: 0 },
  isActive,
  originalIsActive: isActive,
  seenAt: new Date(),
  updatedAt: new Date(),
  createdAt: new Date(),
});

export const updateCardModel = (card: Card, fields: Partial<Card>): void => {
  card.question = fields.question ?? card.question;
  card.content = fields.content ?? card.content;
  card.isActive = fields.isActive ?? card.isActive;
  card.updatedAt = new Date();
};

export const updateLastSeenCard = (card: Card): void => {
  card.statistics.views += 1;
  card.seenAt = new Date();
};
