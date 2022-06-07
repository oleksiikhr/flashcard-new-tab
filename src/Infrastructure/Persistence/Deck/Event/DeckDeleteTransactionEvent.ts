import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';
import Deck from '../../../../Domain/Deck/Deck';
import TransactionAction from '../../Shared/IndexedDB/Transaction/TransactionAction';

export default class DeckDeleteTransactionEvent implements TransactionEvent {
  constructor(private deck: Deck) {}

  public getDeck() {
    return this.deck;
  }

  getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  getAction(): TransactionAction {
    return TransactionAction.DELETE;
  }
}
