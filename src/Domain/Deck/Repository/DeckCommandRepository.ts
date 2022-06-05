import Deck from '../Deck';

export default interface DeckCommandRepository {
  create(deck: Deck): Promise<void>;

  update(deck: Deck): Promise<void>;

  delete(deck: Deck): Promise<void>;
}
