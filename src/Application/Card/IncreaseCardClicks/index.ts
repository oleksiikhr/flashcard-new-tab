import IncreaseCardClicksHandler from './IncreaseCardClicksHandler';
import { cardCommandRepository } from '../../../Domain/Modules/Card/Adapter/cardCommandRepository';
import { cardQueryRepository } from '../../../Domain/Modules/Card/Adapter/cardQueryRepository';

const increaseCardClicks = new IncreaseCardClicksHandler(
  cardCommandRepository,
  cardQueryRepository,
);

export { increaseCardClicks };
