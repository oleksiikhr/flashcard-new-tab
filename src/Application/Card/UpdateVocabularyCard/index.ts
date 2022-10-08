import UpdateVocabularyCardHandler from './UpdateVocabularyCardHandler';
import { cardCommandRepository } from '../../../Domain/Modules/Card/Adapter/cardCommandRepository';
import { cardQueryRepository } from '../../../Domain/Modules/Card/Adapter/cardQueryRepository';

const updateVocabularyCard = new UpdateVocabularyCardHandler(
  cardCommandRepository,
  cardQueryRepository,
);

export { updateVocabularyCard };
