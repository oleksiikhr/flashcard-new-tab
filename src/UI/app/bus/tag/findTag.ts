import FindTagHandler from '../../../../Application/Query/Tag/FindTagHandler';
import make from '../services';
import IDBTagQueryRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';

const handler = new FindTagHandler(make(IDBTagQueryRepository));

export default handler.invoke.bind(handler);
