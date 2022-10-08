import GenerateFeedHandler from './GenerateFeedHandler';
import { deckQueryRepository } from '../../../Domain/Modules/Deck/Adapter/deckQueryRepository';
import { generateFeed as generateFeedService } from '../../../Domain/Modules/Feed/Adapter/generateFeed';

const generateFeed = new GenerateFeedHandler(
  deckQueryRepository,
  generateFeedService,
);

export { generateFeed };
