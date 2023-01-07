import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { deleteTagTransactionListener } from '../listeners/deleteTagTransactionListener';
import { updateDeckOnDeleteTagTransactionListener } from '../../../deck/database/listeners/updateDeckOnDeleteTagTransactionListener';
import { Tag } from '../../model/tag';

export const deleteTagRequest = async (tag: Tag): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, tag, [
    updateDeckOnDeleteTagTransactionListener,
    deleteTagTransactionListener,
    // todo card_tag
  ]);
};
