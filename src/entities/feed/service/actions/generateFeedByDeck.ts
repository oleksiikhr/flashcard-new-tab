import { findDeckByIdRequest } from '../../../deck/database/requests/findDeckByIdRequest';
import { feedGenerator } from '../feedGenerator';
import { Deck } from '../../../deck/model/deck';
import { Card } from '../../../card/model/card';

export const generateFeedByDeck = async (
  deckId: string,
): Promise<{ deck: Deck; cards: Card[] }> => {
  const deck = await findDeckByIdRequest(deckId);

  if (undefined === deck) {
    throw new Error('Deck not found');
  }

  return feedGenerator(deck);
};
