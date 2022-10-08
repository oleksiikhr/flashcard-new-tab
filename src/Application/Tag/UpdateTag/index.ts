import UpdateTagHandler from './UpdateTagHandler';
import { tagCommandRepository } from '../../../Domain/Modules/Tag/Adapter/tagCommandRepository';
import { tagQueryRepository } from '../../../Domain/Modules/Tag/Adapter/tagQueryRepository';

const updateTag = new UpdateTagHandler(
  tagCommandRepository,
  tagQueryRepository,
);

export { updateTag };
