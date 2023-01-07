import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { createCardTransactionListener } from '../listeners/createCardTransactionListener';
import { updateDeckOnCreateCardTransactionListener } from '../../../deck/database/listeners/updateDeckOnCreateCardTransactionListener';
import { Card } from '../../model/card';

export const createCardRequest = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [
    createCardTransactionListener,
    updateDeckOnCreateCardTransactionListener,
  ]);
};
