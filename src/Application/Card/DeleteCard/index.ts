import DeleteCardHandler from './DeleteCardHandler';
import { cardCommandRepository } from '../../../Domain/Modules/Card/Adapter/cardCommandRepository';
import { cardQueryRepository } from '../../../Domain/Modules/Card/Adapter/cardQueryRepository';

const deleteCard = new DeleteCardHandler(
  cardCommandRepository,
  cardQueryRepository,
);

export { deleteCard };
