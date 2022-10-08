import Tag from '../../../../Domain/Modules/Tag/Tag';
import TagCommandRepository from '../../../../Domain/Modules/Tag/Repository/TagCommandRepository';
import TransactionPipeline from '../../../Persistence/IndexedDB/Transaction/TransactionPipeline';
import TagCreateTransactionEvent from '../Event/TagCreateTransactionEvent';
import TagUpdateTransactionEvent from '../Event/TagUpdateTransactionEvent';
import TagDeleteTransactionEvent from '../Event/TagDeleteTransactionEvent';
import CreateTagTransactionListener from '../Listener/CreateTagTransactionListener';
import UpdateDeckOnCreateTagTransactionListener from '../../Deck/Listener/UpdateDeckOnCreateTagTransactionListener';
import UpdateTagTransactionListener from '../Listener/UpdateTagTransactionListener';
import UpdateDeckOnDeleteTagTransactionListener from '../../Deck/Listener/UpdateDeckOnDeleteTagTransactionListener';
import DeleteTagTransactionListener from '../Listener/DeleteTagTransactionListener';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';
import TagMemento from '../../../../Domain/Modules/Tag/Service/TagMemento';

export default class IDBTagCommandRepository implements TagCommandRepository {
  constructor(
    private pipeline: TransactionPipeline,
    private tagMemento: TagMemento,
    private idb: IndexedDB,
  ) {}

  public create(tag: Tag): Promise<void> {
    const event = new TagCreateTransactionEvent(tag);

    return this.pipeline.trigger(event, [
      new CreateTagTransactionListener(this.idb, this.tagMemento),
      new UpdateDeckOnCreateTagTransactionListener(this.idb),
    ]);
  }

  public async update(tag: Tag): Promise<void> {
    const event = new TagUpdateTransactionEvent(tag);

    return this.pipeline.trigger(event, [
      new UpdateTagTransactionListener(this.idb, this.tagMemento),
    ]);
  }

  public async delete(tag: Tag): Promise<void> {
    const event = new TagDeleteTransactionEvent(tag);

    return this.pipeline.trigger(event, [
      new UpdateDeckOnDeleteTagTransactionListener(this.idb),
      new DeleteTagTransactionListener(this.idb),
      // todo card_tag
    ]);
  }
}
