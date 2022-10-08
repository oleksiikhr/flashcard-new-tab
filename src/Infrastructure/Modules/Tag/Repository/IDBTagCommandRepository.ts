import Tag from '../../../../Domain/Modules/Tag/Tag';
import TagCommandRepository from '../../../../Domain/Modules/Tag/Repository/TagCommandRepository';
import TransactionPipeline from '../../../Persistence/IndexedDB/Transaction/TransactionPipeline';
import TagCreateTransactionEvent from '../Event/TagCreateTransactionEvent';
import TagUpdateTransactionEvent from '../Event/TagUpdateTransactionEvent';
import TagDeleteTransactionEvent from '../Event/TagDeleteTransactionEvent';
import CreateTagTransactionListener from '../Listener/CreateTagTransactionListener';
import { tagMemento } from '../../../../Domain/Modules/Tag/Service';
import UpdateDeckOnCreateTagTransactionListener from '../../Deck/Listener/UpdateDeckOnCreateTagTransactionListener';
import { idb } from '../../../Persistence/IndexedDB';
import UpdateTagTransactionListener from '../Listener/UpdateTagTransactionListener';
import UpdateDeckOnDeleteTagTransactionListener from '../../Deck/Listener/UpdateDeckOnDeleteTagTransactionListener';
import DeleteTagTransactionListener from '../Listener/DeleteTagTransactionListener';

export default class IDBTagCommandRepository implements TagCommandRepository {
  constructor(private bus: TransactionPipeline) {}

  public create(tag: Tag): Promise<void> {
    const event = new TagCreateTransactionEvent(tag);

    return this.bus.trigger(event, [
      new CreateTagTransactionListener(idb, tagMemento),
      new UpdateDeckOnCreateTagTransactionListener(idb),
    ]);
  }

  public async update(tag: Tag): Promise<void> {
    const event = new TagUpdateTransactionEvent(tag);

    return this.bus.trigger(event, [
      new UpdateTagTransactionListener(idb, tagMemento),
    ]);
  }

  public async delete(tag: Tag): Promise<void> {
    const event = new TagDeleteTransactionEvent(tag);

    return this.bus.trigger(event, [
      new UpdateDeckOnDeleteTagTransactionListener(idb),
      new DeleteTagTransactionListener(idb),
      // todo card_tag
    ]);
  }
}
