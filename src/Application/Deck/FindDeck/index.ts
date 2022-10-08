import FindDeckHandler from './FindDeckHandler';
import { deckQueryRepository } from '../../../Domain/Modules/Deck/Adapter/deckQueryRepository';

const findDeck = new FindDeckHandler(deckQueryRepository);

export { findDeck };
