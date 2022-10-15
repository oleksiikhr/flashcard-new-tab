import Tag from '../../model/Tag';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { updateTagTransactionListener } from '../listeners/updateTagTransactionListener';

export const updateTagRequest = async (tag: Tag): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, tag, [updateTagTransactionListener]);
};
