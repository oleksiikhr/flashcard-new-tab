import UpdateDeckHandler from '../../../../Application/Command/Deck/UpdateDeckHandler';
import make from '../services';
import IDBDeckCommandRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';
import IDBDeckQueryRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';

const handler = new UpdateDeckHandler(
  make(IDBDeckCommandRepository),
  make(IDBDeckQueryRepository),
);

export default handler.invoke.bind(handler);
