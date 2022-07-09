import IncreaseCardClicksHandler from '../../../../Application/Command/Card/IncreaseCardClicksHandler';
import make from '../services';
import IDBCardCommandRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBCardQueryRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';

const handler = new IncreaseCardClicksHandler(
  make(IDBCardCommandRepository),
  make(IDBCardQueryRepository),
);

export default handler.invoke.bind(handler);
