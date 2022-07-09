import CreateTagHandler from '../../../../Application/Command/Tag/CreateTagHandler';
import make from '../services';
import IDBTagCommandRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagCommandRepository';
import IDBDeckQueryRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import TagUniqueGate from '../../../../Domain/Tag/Gate/TagUniqueGate';

const handler = new CreateTagHandler(
  make(IDBTagCommandRepository),
  make(IDBDeckQueryRepository),
  make(TagUniqueGate),
);

export default handler.invoke.bind(handler);
