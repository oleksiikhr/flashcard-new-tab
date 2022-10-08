import UpdateDeckHandler from './UpdateDeckHandler';
import { deckCommandRepository } from '../../../Domain/Modules/Deck/Adapter/deckCommandRepository';
import { deckQueryRepository } from '../../../Domain/Modules/Deck/Adapter/deckQueryRepository';

const updateDeck = new UpdateDeckHandler(
  deckCommandRepository,
  deckQueryRepository,
);

export { updateDeck };
