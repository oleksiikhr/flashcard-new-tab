import { findCardByIdRequest } from '../../database/repository/cardQueryRepository';
import { deleteCardRequest } from '../../database/repository/cardCommandRepository';

export const deleteCard = async (id: string): Promise<void> => {
  const card = await findCardByIdRequest(id);

  if (undefined === card) {
    return;
  }

  await deleteCardRequest(card);
};
