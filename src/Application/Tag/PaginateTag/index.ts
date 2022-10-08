import PaginateTagHandler from './PaginateTagHandler';
import { tagQueryRepository } from '../../../Domain/Modules/Tag/Adapter/tagQueryRepository';

const paginateTag = new PaginateTagHandler(tagQueryRepository);

export { paginateTag };
