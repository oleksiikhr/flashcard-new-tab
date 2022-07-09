import ImportCardsHandler from '../../../../Application/Command/Card/ImportCardsHandler';
import make from '../services';
import IDBCardCommandRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardCommandRepository';
import IDBTagCommandRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagCommandRepository';
import IDBCardQueryRepository from '../../../../Infrastructure/Persistence/Card/Repository/IDBCardQueryRepository';
import IDBDeckQueryRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import IDBTagQueryRepository from '../../../../Infrastructure/Persistence/Tag/Repository/IDBTagQueryRepository';
import CardContentFactory from '../../../../Domain/Card/Content/CardContentFactory';

const handler = new ImportCardsHandler(
  make(IDBCardCommandRepository),
  make(IDBTagCommandRepository),
  make(IDBCardQueryRepository),
  make(IDBDeckQueryRepository),
  make(IDBTagQueryRepository),
  make(CardContentFactory),
);

export default handler.invoke.bind(handler);
