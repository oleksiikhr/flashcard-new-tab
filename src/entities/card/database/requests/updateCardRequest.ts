import Card from '../../model/Card';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { updateCardTransactionListener } from '../listeners/updateCardTransactionListener';
import { updateDeckOnUpdateCardTransactionListener } from '../../../deck/database/listeners/updateDeckOnUpdateCardTransactionListener';

export const updateCardRequest = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [
    updateCardTransactionListener,
    updateDeckOnUpdateCardTransactionListener,
  ]);
};
