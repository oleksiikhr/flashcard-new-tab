import Deck from '../../../Domain/Deck/Deck';
import DeckName from '../../../Domain/Deck/DeckName';
import DeckSettings from '../../../Domain/Deck/DeckSettings';
import DeckId from '../../../Domain/Deck/DeckId';
import DomainDoesNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainDoesNotExistsError';
import DeckCommandRepository from '../../../Domain/Deck/Repository/DeckCommandRepository';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';

export default class UpdateDeckHandler {
  constructor(
    private commandRepository: DeckCommandRepository,
    private queryRepository: DeckQueryRepository,
  ) {}

  public async invoke(
    id: number,
    name: string,
    isActive: boolean,
    settings: object,
  ): Promise<Deck> {
    const deck = await this.queryRepository.findById(DeckId.of(id));

    if (undefined === deck) {
      throw new DomainDoesNotExistsError();
    }

    deck.from(new DeckName(name), isActive, new DeckSettings(settings));

    await this.commandRepository.update(deck);

    return deck;
  }
}
