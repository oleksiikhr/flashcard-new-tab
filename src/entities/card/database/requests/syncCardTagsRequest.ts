import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { syncCardToTagsTransactionListener } from '../listeners/syncCardToTagsTransactionListener';
import { Card } from '../../model/card';
import { Tag } from '../../../tag/model/tag';

export const syncCardTagsRequest = async (
  card: Card,
  tags: Tag[],
): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, { card, tags }, [
    syncCardToTagsTransactionListener,
  ]);
};
