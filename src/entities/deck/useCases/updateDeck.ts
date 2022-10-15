import { findDeckByIdRequest } from '../database/requests/findDeckByIdRequest';
import Deck, { DeckSettingsRaw } from '../model/Deck';
import { updateDeckRequest } from '../database/requests/updateDeckRequest';

export const updateDeck = async (
  id: number,
  name: string,
  isActive: boolean,
  recalculate: DeckSettingsRaw,
): Promise<Deck> => {
  const deck = await findDeckByIdRequest(id);

  if (undefined === deck) {
    throw new Error('Deck not exist.');
  }

  deck.update(name, isActive, recalculate);

  await updateDeckRequest(deck);

  return deck;
};
