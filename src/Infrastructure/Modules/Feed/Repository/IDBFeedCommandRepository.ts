import FeedCommandRepository from '../../../../Domain/Modules/Feed/Repository/FeedCommandRepository';
import Card from '../../../../Domain/Modules/Card/Card';
import TransactionPipeline from '../../../Persistence/IndexedDB/Transaction/TransactionPipeline';
import FeedDeleteByIdDeckTransactionEvent from '../Event/FeedDeleteByIdDeckTransactionEvent';
import FeedCreateTransactionEvent from '../Event/FeedCreateTransactionEvent';
import Deck from '../../../../Domain/Modules/Deck/Deck';
import CreateFeedTransactionListener from '../Listener/CreateFeedTransactionListener';
import { idb } from '../../../Persistence/IndexedDB';
import DeleteFeedByDeckIdTransactionListener from '../Listener/DeleteFeedByDeckIdTransactionListener';

export default class IDBFeedCommandRepository implements FeedCommandRepository {
  constructor(private pipeline: TransactionPipeline) {}

  public async create(card: Card): Promise<void> {
    const event = new FeedCreateTransactionEvent(card);

    return this.pipeline.trigger(event, [
      new CreateFeedTransactionListener(idb),
    ]);
  }

  public async deleteByDeck(deck: Deck): Promise<void> {
    const event = new FeedDeleteByIdDeckTransactionEvent(deck);

    return this.pipeline.trigger(event, [
      new DeleteFeedByDeckIdTransactionListener(idb),
    ]);
  }
}
