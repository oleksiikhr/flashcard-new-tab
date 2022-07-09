import PaginateDeckHandler from '../../../../Application/Query/Deck/PaginateDeckHandler';
import make from '../services';
import IDBDeckQueryRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';

const handler = new PaginateDeckHandler(make(IDBDeckQueryRepository));

export default handler.invoke.bind(handler);
