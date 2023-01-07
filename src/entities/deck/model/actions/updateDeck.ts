import { findDeckByIdRequest } from '../../database/requests/findDeckByIdRequest';
import { Deck, DeckSettings, updateDeckModel } from '../deck';
import { updateDeckRequest } from '../../database/requests/updateDeckRequest';

export const updateDeck = async (
  id: string,
  name: string,
  isActive: boolean,
  settings: DeckSettings,
): Promise<Deck> => {
  const deck = await findDeckByIdRequest(id);

  if (undefined === deck) {
    throw new Error('Deck not exist.');
  }

  updateDeckModel(deck, {
    name,
    isActive,
    settings,
  });

  await updateDeckRequest(deck);

  return deck;
};
