import Deck from '../Deck';
import DeckId from '../DeckId';

export default interface DeckCommandRepository {
  create(deck: Deck): Promise<void>;

  update(deck: Deck): Promise<void>;

  delete(id: DeckId): Promise<void>;
}
