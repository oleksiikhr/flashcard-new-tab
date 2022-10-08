import ImportCardsHandler from './ImportCardsHandler';
import { cardCommandRepository } from '../../../Domain/Modules/Card/Adapter/cardCommandRepository';
import { tagCommandRepository } from '../../../Domain/Modules/Tag/Adapter/tagCommandRepository';
import { cardQueryRepository } from '../../../Domain/Modules/Card/Adapter/cardQueryRepository';
import { deckQueryRepository } from '../../../Domain/Modules/Deck/Adapter/deckQueryRepository';
import { tagQueryRepository } from '../../../Domain/Modules/Tag/Adapter/tagQueryRepository';
import { cardContentFactory } from '../../../Domain/Modules/Card/Adapter/cardContentFactory';

const importCards = new ImportCardsHandler(
  cardCommandRepository,
  tagCommandRepository,
  cardQueryRepository,
  deckQueryRepository,
  tagQueryRepository,
  cardContentFactory,
);

export { importCards };
