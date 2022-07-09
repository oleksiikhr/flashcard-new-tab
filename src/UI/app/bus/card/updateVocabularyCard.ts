import UpdateVocabularyCardHandler from '../../../../Application/Command/Card/UpdateVocabularyCardHandler';
import make from '../services';
import IDBCardCommandRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBCardQueryRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';

const handler = new UpdateVocabularyCardHandler(
  make(IDBCardCommandRepository),
  make(IDBCardQueryRepository),
);

export default handler.invoke.bind(handler);
