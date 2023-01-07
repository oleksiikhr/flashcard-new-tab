import { findDecksGeneratedUpperByNowRequest } from '../../../deck/database/requests/findDecksGeneratedUpperByNowRequest';
import { feedGenerator } from '../feedGenerator';
import { Deck } from '../../../deck/model/deck';
import { Card } from '../../../card/model/card';

export const generateFeed = async (
  limit: number,
  cb?: (deck: Deck) => void,
): Promise<{ deck: Deck; cards: Card[] }[]> => {
  const decks = await findDecksGeneratedUpperByNowRequest(limit);

  const promises = decks.map((deck) =>
    feedGenerator(deck).then((data) => {
      if (undefined !== cb) {
        cb(deck);
      }

      return data;
    }),
  );

  return Promise.all(promises);
};
