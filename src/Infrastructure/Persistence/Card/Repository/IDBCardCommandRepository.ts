import Card from '../../../../Domain/Card/Card';
import CardCommandRepository from '../../../../Domain/Card/Repository/CardCommandRepository';
import TransactionPipeline from '../../Shared/IndexedDB/TransactionPipeline';
import CardDeleteTransactionEvent from '../Event/CardDeleteTransactionEvent';
import CardCreateTransactionEvent from '../Event/CardCreateTransactionEvent';
import CardUpdateTransactionEvent from '../Event/CardUpdateTransactionEvent';

export default class IDBCardCommandRepository implements CardCommandRepository {
  constructor(private pipeline: TransactionPipeline) {}

  async create(card: Card): Promise<void> {
    return this.pipeline.trigger(new CardCreateTransactionEvent(card));
  }

  async update(card: Card): Promise<void> {
    return this.pipeline.trigger(new CardUpdateTransactionEvent(card));
  }

  delete(card: Card): Promise<void> {
    return this.pipeline.trigger(new CardDeleteTransactionEvent(card));
  }
}
