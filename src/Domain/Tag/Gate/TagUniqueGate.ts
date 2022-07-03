import TagName from '../TagName';
import DeckId from '../../Deck/DeckId';
import TagQueryRepository from '../Repository/TagQueryRepository';
import TagUniqueGateError from './TagUniqueGateError';

export default class TagUniqueGate {
  constructor(private queryRepository: TagQueryRepository) {}

  public async ensureTagIsUnique(deckId: DeckId, name: TagName): Promise<void> {
    const tag = await this.queryRepository.findByDeckIdAndName(deckId, name);

    if (undefined !== tag) {
      throw new TagUniqueGateError(tag);
    }
  }
}
