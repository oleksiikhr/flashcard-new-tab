import TagCreator from '../../../Domain/Tag/Service/TagCreator';
import CreateTagCommand from './CreateTagCommand';
import Tag from '../../../Domain/Tag/Tag';
import DomainNotFoundError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotFoundError';
import TagName from '../../../Domain/Tag/TagName';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DeckId from '../../../Domain/Deck/DeckId';

export default class CreateTagHandler {
  constructor(
    private deckQueryRepository: DeckQueryRepository,
    private creator: TagCreator,
  ) {}

  public async invoke(command: CreateTagCommand): Promise<Tag> {
    const deck = await this.deckQueryRepository.findById(
      DeckId.of(command.getDeckId()),
    );

    if (undefined === deck) {
      throw new DomainNotFoundError();
    }

    return this.creator.create(
      deck,
      new TagName(command.getName()),
      command.getIsActive(),
    );
  }
}
