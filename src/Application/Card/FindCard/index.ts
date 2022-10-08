import FindCardHandler from './FindCardHandler';
import { cardQueryRepository } from '../../../Domain/Modules/Card/Adapter/cardQueryRepository';

const findCard = new FindCardHandler(cardQueryRepository);

export { findCard };
