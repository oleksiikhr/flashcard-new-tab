import { findCardByIdRequest } from '../../database/requests/findCardByIdRequest';
import { updateCardRequest } from '../../database/requests/updateCardRequest';
import { Card } from '../card';

export const increaseCardClicks = async (
  id: string,
  value = 1,
): Promise<Card> => {
  const card = await findCardByIdRequest(id);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  // TODO card.ts
  card.statistics.clicks += value;

  await updateCardRequest(card);

  return card;
};
