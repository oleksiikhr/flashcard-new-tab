import GenerateFeedByDeckHandler from '../../../../Application/Command/Feed/GenerateFeedByDeckHandler';
import make from '../services';
import IDBDeckQueryRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import GenerateFeed from '../../../../Domain/Feed/Service/GenerateFeed';

const handler = new GenerateFeedByDeckHandler(
  make(IDBDeckQueryRepository),
  make(GenerateFeed),
);

export default handler.invoke.bind(handler);
