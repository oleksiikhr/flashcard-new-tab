import GenerateFeed from '../Service/GenerateFeed';
import { feedCommandRepository } from './feedCommandRepository';
import { deckCommandRepository } from '../../Deck/Adapter/deckCommandRepository';
import { cardQueryRepository } from '../../Card/Adapter/cardQueryRepository';
import { logger } from '../../../Adapter/logger';

const generateFeed = new GenerateFeed(
  feedCommandRepository,
  deckCommandRepository,
  cardQueryRepository,
  logger,
);

export { generateFeed };
