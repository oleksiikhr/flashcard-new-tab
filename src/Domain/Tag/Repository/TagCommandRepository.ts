import Tag from '../Tag';
import TagId from '../TagId';
import DeckId from '../../Deck/DeckId';

export default interface TagCommandRepository {
  create(tag: Tag): Promise<void>;

  update(tag: Tag): Promise<void>;

  delete(id: TagId): Promise<void>;

  // deleteByDeckId(deckId: DeckId): Promise<void>;
}
