import FindRandomFeedHandler from '../../../../Application/Query/Feed/FindRandomFeedHandler';
import make from '../services';
import IDBCardCommandRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBFeedQueryRepository from '../../../../Infrastructure/Persistence/Feed/Repository/IDBFeedQueryRepository';

const handler = new FindRandomFeedHandler(
  make(IDBCardCommandRepository),
  make(IDBFeedQueryRepository),
);

export default handler.invoke.bind(handler);
