import Deck from '../../../Domain/Modules/Deck/Deck';
import DeckSettings, {
  DeckSettingsRaw,
} from '../../../Domain/Modules/Deck/ValueObject/DeckSettings';
import DeckId from '../../../Domain/Modules/Deck/DeckId';
import DeckCommandRepository from '../../../Domain/Modules/Deck/Repository/DeckCommandRepository';
import DomainNotExistsError from '../../../Domain/Error/DomainNotExistsError';
import DeckQueryRepository from '../../../Domain/Modules/Deck/Repository/DeckQueryRepository';

export default class UpdateDeckHandler {
  constructor(
    private deckCommandRepository: DeckCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
  ) {}

  public async invoke(
    id: number,
    name: string,
    isActive: boolean,
    recalculate: DeckSettingsRaw,
  ): Promise<Deck> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(id));

    if (undefined === deck) {
      throw new DomainNotExistsError(DeckId.of(id));
    }

    deck.update(name, isActive, new DeckSettings(recalculate));

    await this.deckCommandRepository.update(deck);

    return deck;
  }
}
