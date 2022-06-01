import Tag from '../Tag';
import TagId from '../TagId';
import DeckId from '../../Deck/DeckId';

export default interface TagQueryRepository {
  findById(id: TagId): Promise<Tag | undefined>;

  findByIds(ids: TagId[]): Promise<Tag[]>;

  findActiveByDeckId(deckId: DeckId): Promise<Tag[]>;
}
