import CreateDeckHandler from './CreateDeckHandler';
import { deckCommandRepository } from '../../../Domain/Modules/Deck/Adapter/deckCommandRepository';

const createDeck = new CreateDeckHandler(deckCommandRepository);

export { createDeck };
