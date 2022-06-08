import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';
import DeckId from '../../../../Domain/Deck/DeckId';

export default class FeedDeleteByIdDeckTransactionEvent
  implements TransactionEvent
{
  constructor(private deckId: DeckId) {}

  public getDeckId() {
    return this.deckId;
  }

  getStoreName(): StoreName {
    return StoreName.FEED;
  }
}
