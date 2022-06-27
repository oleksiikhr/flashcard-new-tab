import TransactionEvent from '../../Shared/IndexedDB/Transaction/TransactionEvent';
import Deck from '../../../../Domain/Deck/Deck';

export default class FeedDeleteByIdDeckTransactionEvent
  implements TransactionEvent
{
  constructor(private deck: Deck) {}

  public getDeck(): Deck {
    return this.deck;
  }
}
