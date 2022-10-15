import Card from '../model/Card';
import { findCardByIdRequest } from '../database/requests/findCardByIdRequest';
import { updateCardRequest } from '../database/requests/updateCardRequest';

export const increaseCardClicks = async (
  id: number,
  value = 1,
): Promise<Card> => {
  const card = await findCardByIdRequest(id);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  card.getStatistics().clicks += value;

  await updateCardRequest(card);

  return card;
};
