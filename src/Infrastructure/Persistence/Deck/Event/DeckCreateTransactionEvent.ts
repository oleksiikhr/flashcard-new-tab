import TransactionEvent from '../../Shared/IndexedDB/Bus/TransactionEvent';
import StoreName from '../../Shared/IndexedDB/StoreName';
import Deck from '../../../../Domain/Deck/Deck';
import TransactionAction from '../../Shared/IndexedDB/Bus/TransactionAction';

export default class DeckCreateTransactionEvent implements TransactionEvent {
  constructor(private deck: Deck) {}

  public getDeck() {
    return this.deck;
  }

  getStoreName(): StoreName {
    return StoreName.DECKS;
  }

  getAction(): TransactionAction {
    return TransactionAction.CREATE;
  }
}
