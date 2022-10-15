import Deck, { DeckSettingsRaw } from '../model/Deck';
import { createDeckRequest } from '../database/requests/createDeckRequest';

export const createDeck = async (
  name: string,
  isActive: boolean,
  settings: DeckSettingsRaw,
): Promise<Deck> => {
  const deck = Deck.create(name, isActive, settings);

  await createDeckRequest(deck);

  return deck;
};
