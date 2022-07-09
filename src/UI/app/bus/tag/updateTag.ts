import UpdateTagHandler from '../../../../Application/Command/Tag/UpdateTagHandler';
import make from '../services';
import IDBTagCommandRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagCommandRepository';
import IDBTagQueryRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';
import TagUniqueGate from '../../../../Domain/Tag/Gate/TagUniqueGate';

const handler = new UpdateTagHandler(
  make(IDBTagCommandRepository),
  make(IDBTagQueryRepository),
  make(TagUniqueGate),
);

export default handler.invoke.bind(handler);
