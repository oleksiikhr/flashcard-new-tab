import Tag from '../Tag';
import TagId from '../TagId';
import DeckId from '../../Deck/DeckId';
import TagName from '../TagName';

export default interface TagQueryRepository {
  paginate(fromId: TagId | undefined, limit: number): Promise<Tag[]>;

  findById(id: TagId): Promise<Tag | undefined>;

  findByDeckIdAndName(deckId: DeckId, name: TagName): Promise<Tag | undefined>;

  findByIds(ids: TagId[]): Promise<Tag[]>;

  findActiveByDeckId(deckId: DeckId): Promise<Tag[]>;
}
