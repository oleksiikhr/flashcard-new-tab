import Deck from '../../../deck/model/Deck';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { deleteFeedByDeckIdTransactionListener } from '../listeners/deleteFeedByDeckIdTransactionListener';

export const deleteFeedByDeckRequest = async (deck: Deck): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, deck, [
    deleteFeedByDeckIdTransactionListener,
  ]);
};
