import PaginateCardHandler from '../../../../Application/Query/Card/PaginateCardHandler';
import make from '../services';
import IDBCardQueryRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';

const handler = new PaginateCardHandler(make(IDBCardQueryRepository));

export default handler.invoke.bind(handler);
