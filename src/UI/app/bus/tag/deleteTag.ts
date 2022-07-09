import DeleteTagHandler from '../../../../Application/Command/Tag/DeleteTagHandler';
import make from '../services';
import IDBTagCommandRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagCommandRepository';
import IDBTagQueryRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';

const handler = new DeleteTagHandler(
  make(IDBTagCommandRepository),
  make(IDBTagQueryRepository),
);

export default handler.invoke.bind(handler);
