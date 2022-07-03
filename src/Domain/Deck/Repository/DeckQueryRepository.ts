import Deck from '../Deck';
import DeckId from '../DeckId';

export default interface DeckQueryRepository {
  paginate(fromId: DeckId | undefined, limit: number): Promise<Deck[]>;

  findById(id: DeckId): Promise<Deck | undefined>;

  findGenerateAtUpperByNow(count: number): Promise<Deck[]>;
}
