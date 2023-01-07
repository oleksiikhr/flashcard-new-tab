import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { createFeedTransactionListener } from '../listeners/createFeedTransactionListener';
import { Card } from '../../../card/model/card';

export const createFeedRequest = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [createFeedTransactionListener]);
};
