import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { createDeckTransactionListener } from '../listeners/createDeckTransactionListener';
import { Deck } from '../../model/deck';

export const createDeckRequest = async (deck: Deck): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, deck, [createDeckTransactionListener]);
};
