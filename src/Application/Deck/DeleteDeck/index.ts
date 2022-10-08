import DeleteDeckHandler from './DeleteDeckHandler';
import { deckCommandRepository } from '../../../Domain/Modules/Deck/Adapter/deckCommandRepository';
import { deckQueryRepository } from '../../../Domain/Modules/Deck/Adapter/deckQueryRepository';

const deleteDeck = new DeleteDeckHandler(
  deckCommandRepository,
  deckQueryRepository,
);

export { deleteDeck };
