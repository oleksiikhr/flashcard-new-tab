import Tag from '../../../Domain/Tag/Tag';
import TagName from '../../../Domain/Tag/TagName';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DeckId from '../../../Domain/Deck/DeckId';
import TagCommandRepository from '../../../Domain/Tag/Repository/TagCommandRepository';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';
import TagUniqueGate from '../../../Domain/Tag/Gate/TagUniqueGate';

export default class CreateTagHandler {
  constructor(
    private tagCommandRepository: TagCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
    private tagUniqueTag: TagUniqueGate,
  ) {}

  public async invoke(deckId: number, name: string): Promise<Tag> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotExistsError(DeckId.of(deckId));
    }

    const tagName = new TagName(name);

    const tag = Tag.create(deck.getId(), tagName);

    await this.tagUniqueTag.ensureTagIsUnique(deck.getId(), tagName);

    await this.tagCommandRepository.create(tag);

    return tag;
  }
}
