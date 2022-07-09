import FindDeckHandler from '../../../../Application/Query/Deck/FindDeckHandler';
import make from '../services';
import IDBDeckQueryRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';

const handler = new FindDeckHandler(make(IDBDeckQueryRepository));

export default handler.invoke.bind(handler);
