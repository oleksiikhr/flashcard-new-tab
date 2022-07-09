import make from '../services';
import IDBCardQueryRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';
import FindCardHandler from '../../../../Application/Query/Card/FindCardHandler';

const handler = new FindCardHandler(make(IDBCardQueryRepository));

export default handler.invoke.bind(handler);
