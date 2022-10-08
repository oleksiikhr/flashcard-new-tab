import { cardCommandRepository } from '../../../Domain/Modules/Card/Adapter/cardCommandRepository';
import CreateVocabularyCardHandler from './CreateVocabularyCardHandler';
import { deckQueryRepository } from '../../../Domain/Modules/Deck/Adapter/deckQueryRepository';

const createVocabularyCard = new CreateVocabularyCardHandler(
  cardCommandRepository,
  deckQueryRepository,
);

export { createVocabularyCard };
