import Card from '../../model/Card';
import Tag from '../../../tag/model/Tag';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { syncCardToTagsTransactionListener } from '../listeners/syncCardToTagsTransactionListener';

export const syncCardTagsRequest = async (
  card: Card,
  tags: Tag[],
): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, { card, tags }, [
    syncCardToTagsTransactionListener,
  ]);
};
