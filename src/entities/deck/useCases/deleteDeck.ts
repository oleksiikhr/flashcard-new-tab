import { findDeckByIdRequest } from '../database/requests/findDeckByIdRequest';
import { deleteDeckRequest } from '../database/requests/deleteDeckRequest';

export const deleteDeck = async (id: number): Promise<void> => {
  const deck = await findDeckByIdRequest(id);

  if (undefined === deck) {
    return;
  }

  await deleteDeckRequest(deck);
};
