import GenerateFeedHandler from '../../../../Application/Command/Feed/GenerateFeedHandler';
import make from '../services';
import IDBDeckQueryRepository from '../../../../Infrastructure/Persistence/Deck/Repository/IDBDeckQueryRepository';
import GenerateFeed from '../../../../Domain/Feed/Service/GenerateFeed';
import ConsoleLogger from '../../../../Infrastructure/Service/Logger/ConsoleLogger';

const handler = new GenerateFeedHandler(
  make(IDBDeckQueryRepository),
  make(GenerateFeed),
  make(ConsoleLogger),
);

export default handler.invoke.bind(handler);
