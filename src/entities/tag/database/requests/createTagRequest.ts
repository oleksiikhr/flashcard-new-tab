import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { createTagTransactionListener } from '../listeners/createTagTransactionListener';
import { updateDeckOnCreateTagTransactionListener } from '../../../deck/database/listeners/updateDeckOnCreateTagTransactionListener';
import { Tag } from '../../model/tag';

export const createTagRequest = async (tag: Tag): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, tag, [
    createTagTransactionListener,
    updateDeckOnCreateTagTransactionListener,
  ]);
};
