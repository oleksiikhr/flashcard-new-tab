import CreateDeckHandler from '../../../../Application/Command/Deck/CreateDeckHandler';
import make from '../services';
import IDBDeckCommandRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';

const handler = new CreateDeckHandler(make(IDBDeckCommandRepository));

export default handler.invoke.bind(handler);
