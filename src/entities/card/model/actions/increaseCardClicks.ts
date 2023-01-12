import {Card, updateCardClicks} from '../card';
import {findCardByIdQuery} from "../../database/repository/query";
import {updateCardQuery} from "../../database/repository/command";

export const increaseCardClicks = async (
  card: Card | string,
  value = 1,
): Promise<Card> => {
  if (typeof card === 'string') {
    const c = await findCardByIdQuery(card);

    if (undefined === c) {
      throw new Error('Card not found.');
    }

    card = c
  }

  updateCardClicks(card, card.statistics.clicks + value)

  await updateCardQuery(card);

  return card;
};
