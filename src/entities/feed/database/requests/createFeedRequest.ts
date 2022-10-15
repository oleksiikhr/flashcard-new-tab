import Card from '../../../card/model/Card';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { createFeedTransactionListener } from '../listeners/createFeedTransactionListener';

export const createFeedRequest = async (card: Card): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, card, [createFeedTransactionListener]);
};
