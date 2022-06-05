import Tag from '../../../../Domain/Tag/Tag';
import TagCommandRepository from '../../../../Domain/Tag/Repository/TagCommandRepository';
import TransactionPipeline from '../../Shared/IndexedDB/TransactionPipeline';
import TagCreateTransactionEvent from '../Event/TagCreateTransactionEvent';
import TagUpdateTransactionEvent from '../Event/TagUpdateTransactionEvent';
import TagDeleteTransactionEvent from '../Event/TagDeleteTransactionEvent';

export default class IDBTagCommandRepository implements TagCommandRepository {
  constructor(private bus: TransactionPipeline) {}

  public create(tag: Tag): Promise<void> {
    return this.bus.trigger(new TagCreateTransactionEvent(tag));
  }

  public async update(tag: Tag): Promise<void> {
    return this.bus.trigger(new TagUpdateTransactionEvent(tag));
  }

  public async delete(tag: Tag): Promise<void> {
    return this.bus.trigger(new TagDeleteTransactionEvent(tag));
  }
}
