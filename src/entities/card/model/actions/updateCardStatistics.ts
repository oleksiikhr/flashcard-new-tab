import { Card, CardStatistics, updateCardModel } from '../card';
import { updateCardRequest } from '../../database/repository/cardCommandRepository';
import { findCardByIdRequest } from '../../database/repository/cardQueryRepository';

export const updateCardStatistics = async (
  id: string,
  statistics: Partial<CardStatistics>,
): Promise<Card> => {
  const card = await findCardByIdRequest(id);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  updateCardModel(card, {
    statistics,
    updatedAt: new Date(),
  });

  await updateCardRequest(card);

  return card;
};
