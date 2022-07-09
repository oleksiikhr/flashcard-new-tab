import DeleteDeckHandler from '../../../../Application/Command/Deck/DeleteDeckHandler';
import make from '../services';
import IDBDeckCommandRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckCommandRepository';
import IDBDeckQueryRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';

const handler = new DeleteDeckHandler(
  make(IDBDeckCommandRepository),
  make(IDBDeckQueryRepository),
);

export default handler.invoke.bind(handler);
