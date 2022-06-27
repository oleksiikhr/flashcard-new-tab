import Card from '../../Card/Card';
import Deck from '../../Deck/Deck';

export default interface FeedCommandRepository {
  create(card: Card): Promise<void>;

  deleteByDeck(deck: Deck): Promise<void>;
}
