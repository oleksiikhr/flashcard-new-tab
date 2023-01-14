import { CardContent, cardContentFactory } from './content/cardContentFactory';
import { createIdentifier } from '../../../shared/util/identifier';

export type Card = {
  id: string;
  question: string;
  content: CardContent;
  templateType: CardTemplateType;
  statistics: CardStatistics;
  status: CardStatus;
  isFeed: boolean;
  seenAt: Date | null;
  nextAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
};

export enum CardStatus {
  DELETED = 0,
  NEW = 1,
  REPEAT = 2,
}

export type CardStatistics = {
  forgot: number;
  remembered: number;
  views: number;
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
  status: CardStatus;
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
  status: card.status,
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
  status: raw.status,
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
  statistics: Partial<CardStatistics> = {},
  status: CardStatus = CardStatus.NEW,
  isFeed = false,
  seenAt: Date | null = null,
  nextAt: Date | null = null,
  updatedAt: Date | null = null,
  createdAt: Date | null = null,
): Card => {
  nextAt = status === CardStatus.REPEAT ? nextAt ?? new Date() : nextAt;

  return {
    id: createIdentifier(),
    question,
    content,
    templateType,
    statistics: {
      views: 0,
      remembered: 0,
      forgot: 0,
      ...statistics,
    },
    status,
    isFeed: status === CardStatus.DELETED ? false : isFeed,
    seenAt,
    nextAt: status === CardStatus.DELETED ? null : nextAt,
    updatedAt: updatedAt ?? new Date(),
    createdAt: createdAt ?? new Date(),
  };
};

export const updateCardModel = (
  card: Card,
  fields: {
    question?: string | undefined;
    content?: CardContent | undefined;
    statistics?: Partial<CardStatistics> | undefined;
    status?: CardStatus | undefined;
    isFeed?: boolean | undefined;
    seenAt?: Date | null | undefined;
    nextAt?: Date | null | undefined;
    updatedAt?: Date | undefined;
    createdAt?: Date | undefined;
  },
): void => {
  const status = fields.status ?? card.status;
  const nextAt =
    status === CardStatus.REPEAT
      ? fields.nextAt ?? card.nextAt ?? new Date()
      : fields.nextAt ?? card.nextAt;

  card.question = fields.question ?? card.question;
  card.content = fields.content ?? card.content;
  card.statistics = fields.statistics
    ? { ...card.statistics, ...fields.statistics }
    : card.statistics;
  card.status = status;
  card.isFeed =
    status === CardStatus.DELETED ? false : fields.isFeed ?? card.isFeed;
  card.seenAt = fields.seenAt ?? card.seenAt;
  card.nextAt = status === CardStatus.DELETED ? null : nextAt;
  card.updatedAt = fields.updatedAt ?? card.updatedAt ?? new Date();
  card.createdAt = fields.createdAt ?? card.createdAt ?? new Date();
};
