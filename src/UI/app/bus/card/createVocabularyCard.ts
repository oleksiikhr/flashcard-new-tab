import CreateVocabularyCardHandler from '../../../../Application/Command/Card/CreateVocabularyCardHandler';
import make from '../services';
import IDBCardCommandRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBDeckQueryRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';

const handler = new CreateVocabularyCardHandler(
  make(IDBCardCommandRepository),
  make(IDBDeckQueryRepository),
);

export default handler.invoke.bind(handler);
