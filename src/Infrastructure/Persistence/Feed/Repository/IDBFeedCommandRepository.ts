import FeedCommandRepository from '../../../../Domain/Feed/Repository/FeedCommandRepository';
import Card from '../../../../Domain/Card/Card';
import TransactionPipeline from '../../Shared/IndexedDB/Transaction/TransactionPipeline';
import FeedDeleteByIdDeckTransactionEvent from '../Event/FeedDeleteByIdDeckTransactionEvent';
import FeedCreateTransactionEvent from '../Event/FeedCreateTransactionEvent';
import Deck from '../../../../Domain/Deck/Deck';

export default class IDBFeedCommandRepository implements FeedCommandRepository {
  constructor(private pipeline: TransactionPipeline) {}

  public async create(card: Card): Promise<void> {
    return this.pipeline.trigger(new FeedCreateTransactionEvent(card));
  }

  public async deleteByDeck(deck: Deck): Promise<void> {
    return this.pipeline.trigger(new FeedDeleteByIdDeckTransactionEvent(deck));
  }
}
