import { Card, updateCardModel } from '../card';
import { findRandomFeedCardRequest } from '../../database/repository/cardQueryRepository';
import { updateCardRequest } from '../../database/repository/cardCommandRepository';

export const nextFeedCard = async (): Promise<Card | null> => {
  const card = await findRandomFeedCardRequest();

  if (card === null) {
    return null;
  }

  updateCardModel(card, {
    statistics: { views: card.statistics.views + 1 },
    seenAt: new Date(),
  });

  await updateCardRequest(card);

  return card;
};
