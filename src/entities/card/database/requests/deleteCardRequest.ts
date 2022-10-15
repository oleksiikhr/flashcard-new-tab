import Card from '../../model/Card';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { deleteCardTransactionListener } from '../listeners/deleteCardTransactionListener';
import { updateDeckOnDeleteCardTransactionListener } from '../../../deck/database/listeners/updateDeckOnDeleteCardTransactionListener';
import { deleteFeedOnDeleteCardTransactionListener } from '../../../feed/database/listeners/deleteFeedOnDeleteCardTransactionListener';

export const deleteCardRequest = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [
    updateDeckOnDeleteCardTransactionListener,
    deleteFeedOnDeleteCardTransactionListener,
    deleteCardTransactionListener,
  ]);
};
