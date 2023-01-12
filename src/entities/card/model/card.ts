import { CardContent, cardContentFactory } from './content/cardContentFactory';
import { createIdentifier } from '../../../shared/util/identifier';

export type Card = {
  id: string;
  question: string;
  content: CardContent;
  templateType: CardTemplateType;
  statistics: CardStatistics;
  isActive: boolean;
  isFeed: boolean;
  seenAt: Date | null;
  nextAt: Date | null;
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
  question: string;
  content: object;
  template_type: number;
  statistics: CardStatistics;
  is_active: number;
  is_feed: number;
  seen_at: Date | null;
  next_at: Date | null;
  updated_at: Date;
  created_at: Date;
};

export const serializeCard = (card: Card): CardSerialized => ({
  id: card.id,
  question: card.question,
  content: card.content.serialize(),
  template_type: card.templateType,
  statistics: card.statistics,
  is_active: +card.isActive,
  is_feed: +card.isFeed,
  seen_at: card.seenAt,
  next_at: card.nextAt,
  updated_at: card.updatedAt,
  created_at: card.createdAt,
});

export const unserializeCard = (raw: CardSerialized): Card => ({
  id: raw.id,
  question: raw.question,
  content: cardContentFactory(raw.content, raw.template_type),
  templateType: raw.template_type,
  statistics: raw.statistics,
  isActive: !!raw.is_active,
  isFeed: !!raw.is_feed,
  seenAt: raw.seen_at,
  nextAt: raw.next_at,
  updatedAt: raw.updated_at,
  createdAt: raw.created_at,
});

export const createCardModel = (
  question: string,
  content: CardContent,
  templateType: CardTemplateType,
  isActive: boolean,
): Card => ({
  id: createIdentifier(),
  question,
  content,
  templateType,
  statistics: { views: 0, clicks: 0 },
  isActive,
  isFeed: false,
  seenAt: null,
  nextAt: null,
  updatedAt: new Date(),
  createdAt: new Date(),
});

export const updateCardModel = (card: Card, fields: {
  question?: string,
  content?: CardContent,
  isActive?: boolean,
}): void => {
  card.question = fields.question ?? card.question
  card.content = fields.content ?? card.content
  card.isActive = fields.isActive ?? card.isActive
  card.updatedAt = new Date()
};

export const updateLastSeenCard = (card: Card): void => {
  card.statistics.views += 1;
  card.seenAt = new Date();
};

export const updateCardClicks = (card: Card, value: number): void => {
  card.statistics.clicks = value;
}
