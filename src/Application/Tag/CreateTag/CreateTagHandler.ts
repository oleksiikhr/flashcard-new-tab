import Tag from '../../../Domain/Modules/Tag/Tag';
import DeckId from '../../../Domain/Modules/Deck/DeckId';
import TagCommandRepository from '../../../Domain/Modules/Tag/Repository/TagCommandRepository';
import DomainNotExistsError from '../../../Domain/Error/DomainNotExistsError';
import DeckQueryRepository from '../../../Domain/Modules/Deck/Repository/DeckQueryRepository';
import TagQueryRepository from '../../../Domain/Modules/Tag/Repository/TagQueryRepository';

export default class CreateTagHandler {
  constructor(
    private tagCommandRepository: TagCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
    private tagQueryRepository: TagQueryRepository,
  ) {}

  public async invoke(deckId: number, name: string): Promise<Tag> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotExistsError(DeckId.of(deckId));
    }

    const tag = await Tag.create(deck.getId(), name, this.tagQueryRepository);

    await this.tagCommandRepository.create(tag);

    return tag;
  }
}
