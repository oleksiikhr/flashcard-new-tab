import Deck from '../../../../Domain/Deck/Deck';
import DeckCommandRepository from '../../../../Domain/Deck/Repository/DeckCommandRepository';
import TransactionPipeline from '../../Shared/IndexedDB/Transaction/TransactionPipeline';
import DeckDeleteTransactionEvent from '../Event/DeckDeleteTransactionEvent';
import DeckCreateTransactionEvent from '../Event/DeckCreateTransactionEvent';
import DeckUpdateTransactionEvent from '../Event/DeckUpdateTransactionEvent';

export default class IDBDeckCommandRepository implements DeckCommandRepository {
  constructor(private pipeline: TransactionPipeline) {}

  public async create(deck: Deck): Promise<void> {
    return this.pipeline.trigger(new DeckCreateTransactionEvent(deck));
  }

  public async update(deck: Deck): Promise<void> {
    return this.pipeline.trigger(new DeckUpdateTransactionEvent(deck));
  }

  public async delete(deck: Deck): Promise<void> {
    return this.pipeline.trigger(new DeckDeleteTransactionEvent(deck));
  }
}
