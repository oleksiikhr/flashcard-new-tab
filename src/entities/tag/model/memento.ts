import Tag from './Tag';

export type TagRaw = {
  id?: number | undefined;
  deck_id: number;
  name: string;
  updated_at: Date;
  created_at: Date;
};

export const serializeTag = (tag: Tag): TagRaw => ({
  id: tag.isExists() ? tag.getId() : undefined,
  deck_id: tag.getDeckId(),
  name: tag.getName(),
  updated_at: tag.getUpdatedAt(),
  created_at: tag.getCreatedAt(),
});

export const unserializeTag = (raw: TagRaw): Tag =>
  new Tag(raw.id, raw.deck_id, raw.name, raw.updated_at, raw.created_at);
