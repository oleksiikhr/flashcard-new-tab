import GenerateFeedByDeckHandler from './GenerateFeedByDeckHandler';
import { deckQueryRepository } from '../../../Domain/Modules/Deck/Adapter/deckQueryRepository';
import { generateFeed } from '../../../Domain/Modules/Feed/Adapter/generateFeed';

const generateFeedByDeck = new GenerateFeedByDeckHandler(
  deckQueryRepository,
  generateFeed,
);

export { generateFeedByDeck };
