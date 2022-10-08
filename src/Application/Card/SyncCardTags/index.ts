import SyncCardTagsHandler from './SyncCardTagsHandler';
import { cardCommandRepository } from '../../../Domain/Modules/Card/Adapter/cardCommandRepository';
import { cardQueryRepository } from '../../../Domain/Modules/Card/Adapter/cardQueryRepository';
import { tagQueryRepository } from '../../../Domain/Modules/Tag/Adapter/tagQueryRepository';

const syncCardTags = new SyncCardTagsHandler(
  cardCommandRepository,
  cardQueryRepository,
  tagQueryRepository,
);

export { syncCardTags };
