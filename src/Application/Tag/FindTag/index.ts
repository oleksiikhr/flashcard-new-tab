import FindTagHandler from './FindTagHandler';
import { tagQueryRepository } from '../../../Domain/Modules/Tag/Adapter/tagQueryRepository';

const findTag = new FindTagHandler(tagQueryRepository);

export { findTag };
