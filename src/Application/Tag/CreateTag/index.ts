import CreateTagHandler from './CreateTagHandler';
import { tagCommandRepository } from '../../../Domain/Modules/Tag/Adapter/tagCommandRepository';
import { deckQueryRepository } from '../../../Domain/Modules/Deck/Adapter/deckQueryRepository';
import { tagQueryRepository } from '../../../Domain/Modules/Tag/Adapter/tagQueryRepository';

const createTag = new CreateTagHandler(
  tagCommandRepository,
  deckQueryRepository,
  tagQueryRepository,
);

export { createTag };
