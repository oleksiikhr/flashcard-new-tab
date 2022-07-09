import DeleteCardHandler from '../../../../Application/Command/Card/DeleteDeckHandler';
import make from '../services';
import IDBCardCommandRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBCardQueryRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';

const handler = new DeleteCardHandler(
  make(IDBCardCommandRepository),
  make(IDBCardQueryRepository),
);

export default handler.invoke.bind(handler);
