import TransactionEvent from '../../../Persistence/IndexedDB/Transaction/TransactionEvent';
import Deck from '../../../../Domain/Modules/Deck/Deck';

export default class DeckUpdateTransactionEvent implements TransactionEvent {
  constructor(private deck: Deck) {}

  public getDeck(): Deck {
    return this.deck;
  }
}
