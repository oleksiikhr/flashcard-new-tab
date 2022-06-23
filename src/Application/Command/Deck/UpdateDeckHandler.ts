import Deck from '../../../Domain/Deck/Deck';
import DeckName from '../../../Domain/Deck/DeckName';
import DeckSettings, {
  DeckSettingsRaw,
} from '../../../Domain/Deck/DeckSettings';
import DeckId from '../../../Domain/Deck/DeckId';
import DeckCommandRepository from '../../../Domain/Deck/Repository/DeckCommandRepository';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';

export default class UpdateDeckHandler {
  constructor(
    private commandRepository: DeckCommandRepository,
    private queryRepository: DeckQueryRepository,
  ) {}

  /**
   * @throws {DomainNotExistsError}
   * @throws {ObjectValueValidation}
   * @throws {InvalidIdentifierError}
   */
  public async invoke(
    id: number,
    name: string,
    isActive: boolean,
    recalculate: DeckSettingsRaw,
  ): Promise<Deck> {
    const deck = await this.queryRepository.findById(DeckId.of(id));

    if (undefined === deck) {
      throw new DomainNotExistsError(DeckId.of(id));
    }

    deck.from(new DeckName(name), isActive, new DeckSettings(recalculate));

    await this.commandRepository.update(deck);

    return deck;
  }
}
