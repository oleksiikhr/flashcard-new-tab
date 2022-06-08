import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';
import Deck from '../../../../Domain/Deck/Deck';

export default class DeckUpdateTransactionEvent implements TransactionEvent {
  constructor(private deck: Deck) {}

  public getDeck() {
    return this.deck;
  }

  getStoreName(): StoreName {
    return StoreName.DECKS;
  }
}
