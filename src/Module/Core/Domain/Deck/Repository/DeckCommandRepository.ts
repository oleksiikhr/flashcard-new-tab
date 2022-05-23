import Deck from '../Deck';

export default interface DeckCommandRepository {
  create(deck: Deck): Promise<void>;
}
