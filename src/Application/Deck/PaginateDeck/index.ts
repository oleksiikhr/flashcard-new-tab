import PaginateDeckHandler from './PaginateDeckHandler';
import { deckQueryRepository } from '../../../Domain/Modules/Deck/Adapter/deckQueryRepository';

const paginateDeck = new PaginateDeckHandler(deckQueryRepository);

export { paginateDeck };
