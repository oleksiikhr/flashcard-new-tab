import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { transactionPipeline } from '../../../../shared/database/indexedDB/transactionPipeline';
import { deleteCardsOnDeleteDeckTransactionListener } from '../../../card/database/listeners/deleteCardsOnDeleteDeckTransactionListener';
import { deleteCardTagsOnDeleteDeckTransactionListener } from '../../../card/database/listeners/deleteCardTagsOnDeleteDeckTransactionListener';
import { deleteTagsOnDeleteDeckTransactionListener } from '../../../tag/database/listeners/deleteTagsOnDeleteDeckTransactionListener';
import { deleteDeckTransactionListener } from '../listeners/deleteDeckTransactionListener';
import { deleteFeedOnDeleteDeckTransactionListener } from '../../../feed/database/listeners/deleteFeedOnDeleteDeckTransactionListener';
import { Deck } from '../../model/deck';

export const deleteDeckRequest = async (deck: Deck): Promise<void> => {
  const conn = await useConnection();

  return transactionPipeline(conn, deck, [
    deleteCardsOnDeleteDeckTransactionListener,
    deleteFeedOnDeleteDeckTransactionListener,
    deleteTagsOnDeleteDeckTransactionListener,
    deleteCardTagsOnDeleteDeckTransactionListener,
    deleteDeckTransactionListener,
  ]);
};
