import Deck from '../../deck/model/Deck';
import Card from '../../card/model/Card';
import { findDeckByIdRequest } from '../../deck/database/requests/findDeckByIdRequest';
import { feedGenerator } from '../service/feedGenerator';

export const generateFeedByDeck = async (
  deckId: number,
): Promise<{ deck: Deck; cards: Card[] }> => {
  const deck = await findDeckByIdRequest(deckId);

  if (undefined === deck) {
    throw new Error('Deck not found');
  }

  return feedGenerator(deck);
};
