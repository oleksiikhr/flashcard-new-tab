import Tag from '../../../Domain/Tag/Tag';
import DomainNotFoundError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotFoundError';
import TagName from '../../../Domain/Tag/TagName';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DeckId from '../../../Domain/Deck/DeckId';
import TagCommandRepository from '../../../Domain/Tag/Repository/TagCommandRepository';

export default class CreateTagHandler {
  constructor(
    private tagCommandRepository: TagCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
  ) {}

  public async invoke(
    deckId: number,
    name: string,
    isActive: boolean,
  ): Promise<Tag> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotFoundError();
    }

    const tag = Tag.create(deck, new TagName(name), isActive);

    await this.tagCommandRepository.create(tag);

    return tag;
  }
}
