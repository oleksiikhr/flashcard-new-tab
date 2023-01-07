import { createIdentifier } from '../../../shared/util/identifier';

export type Tag = {
  id: string;
  deckId: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
};

export type TagSerialized = {
  id: string;
  deck_id: string;
  name: string;
  updated_at: Date;
  created_at: Date;
};

export const serializeTag = (tag: Tag): TagSerialized => ({
  id: tag.id,
  deck_id: tag.deckId,
  name: tag.name,
  updated_at: tag.updatedAt,
  created_at: tag.createdAt,
});

export const unserializeTag = (raw: TagSerialized): Tag => ({
  id: raw.id,
  deckId: raw.deck_id,
  name: raw.name,
  updatedAt: raw.updated_at,
  createdAt: raw.created_at,
});

export const createTagModel = (deckId: string, name: string): Tag => ({
  id: createIdentifier(),
  deckId,
  name,
  updatedAt: new Date(),
  createdAt: new Date(),
});

export const updateTagModel = (tag: Tag, fields: Partial<Tag>): void => {
  tag.name = fields.name ?? tag.name;
  tag.updatedAt = new Date();
};
