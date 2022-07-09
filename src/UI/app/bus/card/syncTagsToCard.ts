import SyncTagsToCardHandler from '../../../../Application/Command/Card/SyncTagsToCardHandler';
import make from '../services';
import IDBCardCommandRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBCardQueryRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';
import IDBTagQueryRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';

const handler = new SyncTagsToCardHandler(
  make(IDBCardCommandRepository),
  make(IDBCardQueryRepository),
  make(IDBTagQueryRepository),
);

export default handler.invoke.bind(handler);
