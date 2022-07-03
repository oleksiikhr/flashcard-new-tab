import Card from '../../../../Domain/Card/Card';
import CardCommandRepository from '../../../../Domain/Card/Repository/CardCommandRepository';
import TransactionPipeline from '../../Shared/IndexedDB/Transaction/TransactionPipeline';
import CardDeleteTransactionEvent from '../Event/CardDeleteTransactionEvent';
import CardCreateTransactionEvent from '../Event/CardCreateTransactionEvent';
import CardUpdateTransactionEvent from '../Event/CardUpdateTransactionEvent';
import Tag from '../../../../Domain/Tag/Tag';
import CardSyncTagsTransactionEvent from '../Event/CardSyncTagsTransactionEvent';

export default class IDBCardCommandRepository implements CardCommandRepository {
  constructor(private pipeline: TransactionPipeline) {}

  public create(card: Card): Promise<void> {
    return this.pipeline.trigger(new CardCreateTransactionEvent(card));
  }

  public update(card: Card): Promise<void> {
    return this.pipeline.trigger(new CardUpdateTransactionEvent(card));
  }

  public delete(card: Card): Promise<void> {
    return this.pipeline.trigger(new CardDeleteTransactionEvent(card));
  }

  public syncTags(card: Card, tags: Tag[]): Promise<void> {
    return this.pipeline.trigger(new CardSyncTagsTransactionEvent(card, tags));
  }
}
