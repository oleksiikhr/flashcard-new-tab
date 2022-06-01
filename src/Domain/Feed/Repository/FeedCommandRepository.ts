import DeckId from '../../Deck/DeckId';
import Card from '../../Card/Card';

export default interface FeedCommandRepository {
  create(card: Card): Promise<void>;

  // deleteByDeckId(deckId: DeckId): Promise<void>;
}
