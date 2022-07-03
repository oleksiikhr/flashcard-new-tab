import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Deck from '../../../../Domain/Deck/Deck';

export default class DeckCreateTransactionEvent implements TransactionEvent {
  constructor(private deck: Deck) {}

  public getDeck(): Deck {
    return this.deck;
  }
}
