import Card from '../../Card/Card';
import DeckId from '../../Deck/DeckId';

export default interface FeedCommandRepository {
  create(card: Card): Promise<void>;

  deleteByDeckId(deckId: DeckId): Promise<void>;
}
