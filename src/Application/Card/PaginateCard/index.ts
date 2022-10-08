import PaginateCardHandler from './PaginateCardHandler';
import { cardQueryRepository } from '../../../Domain/Modules/Card/Adapter/cardQueryRepository';

const paginateCard = new PaginateCardHandler(cardQueryRepository);

export { paginateCard };
