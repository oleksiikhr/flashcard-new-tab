import { createDeckRequest } from '../../database/requests/createDeckRequest';
import { createDeckModel, Deck, DeckSettings } from '../deck';

export const createDeck = async (
  name: string,
  isActive: boolean,
  settings: DeckSettings,
): Promise<Deck> => {
  const deck = createDeckModel(name, isActive, settings);

  await createDeckRequest(deck);

  return deck;
};
