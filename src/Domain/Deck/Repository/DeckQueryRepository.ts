import Deck from '../Deck';
import DeckId from '../DeckId';

export default interface DeckQueryRepository {
  findById(id: DeckId): Promise<Deck | undefined>;

  findGenerateAtUpperByNow(count: number): Promise<Deck[]>;
}
