import TransactionEvent from '../../../Persistence/IndexedDB/Transaction/TransactionEvent';
import Card from '../../../../Domain/Modules/Card/Card';

export default class CardDeleteTransactionEvent implements TransactionEvent {
  constructor(private card: Card) {}

  public getCard(): Card {
    return this.card;
  }
}
