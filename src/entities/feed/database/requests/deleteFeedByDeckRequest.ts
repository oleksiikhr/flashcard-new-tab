import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { Deck } from '../../../deck/model/deck';
import { deleteFeedOnDeleteDeckTransactionListener } from '../listeners/deleteFeedOnDeleteDeckTransactionListener';

export const deleteFeedByDeckRequest = async (deck: Deck): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, deck, [
    deleteFeedOnDeleteDeckTransactionListener,
  ]);
};
