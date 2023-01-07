import { findCardByIdRequest } from '../../database/requests/findCardByIdRequest';
import { deleteCardRequest } from '../../database/requests/deleteCardRequest';

export const deleteCard = async (id: string): Promise<void> => {
  const card = await findCardByIdRequest(id);

  if (undefined === card) {
    return;
  }

  await deleteCardRequest(card);
};
