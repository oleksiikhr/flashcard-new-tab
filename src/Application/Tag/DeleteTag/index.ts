import DeleteTagHandler from './DeleteTagHandler';
import { tagQueryRepository } from '../../../Domain/Modules/Tag/Adapter/tagQueryRepository';
import { tagCommandRepository } from '../../../Domain/Modules/Tag/Adapter/tagCommandRepository';

const deleteTag = new DeleteTagHandler(
  tagCommandRepository,
  tagQueryRepository,
);

export { deleteTag };
