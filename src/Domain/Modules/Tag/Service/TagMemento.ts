import Tag from '../Tag';
import TagId from '../TagId';
import DeckId from '../../Deck/DeckId';

export type TagRaw = {
  id?: number | undefined;
  deck_id: number;
  name: string;
  updated_at: Date;
  created_at: Date;
};

export default class TagMemento {
  public serialize(tag: Tag): TagRaw {
    return {
      id: tag.isExists() ? tag.getId().getIdentifier() : undefined,
      deck_id: tag.getDeckId().getIdentifier(),
      name: tag.getName(),
      updated_at: tag.getUpdatedAt(),
      created_at: tag.getCreatedAt(),
    };
  }

  public unserialize(raw: TagRaw): Tag {
    return new Tag(
      undefined !== raw.id ? TagId.of(raw.id) : undefined,
      DeckId.of(raw.deck_id),
      raw.name,
      raw.updated_at,
      raw.created_at,
    );
  }
}
