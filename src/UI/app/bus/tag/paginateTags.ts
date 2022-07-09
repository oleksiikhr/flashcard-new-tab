import PaginateTagHandler from '../../../../Application/Query/Tag/PaginateTagHandler';
import make from '../services';
import IDBTagQueryRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';

const handler = new PaginateTagHandler(make(IDBTagQueryRepository));

export default handler.invoke.bind(handler);
