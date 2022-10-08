import FindRandomFeedHandler from './FindRandomFeedHandler';
import { cardCommandRepository } from '../../../Domain/Modules/Card/Adapter/cardCommandRepository';
import { feedQueryRepository } from '../../../Domain/Modules/Feed/Adapter/feedQueryRepository';

const findRandomFeed = new FindRandomFeedHandler(
  cardCommandRepository,
  feedQueryRepository,
);

export { findRandomFeed };
