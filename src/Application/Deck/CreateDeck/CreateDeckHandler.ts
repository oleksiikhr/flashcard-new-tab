import Deck from '../../../Domain/Modules/Deck/Deck';
import DeckSettings, {
  DeckSettingsRaw,
} from '../../../Domain/Modules/Deck/ValueObject/DeckSettings';
import DeckCommandRepository from '../../../Domain/Modules/Deck/Repository/DeckCommandRepository';

export default class CreateDeckHandler {
  constructor(private deckCommandRepository: DeckCommandRepository) {}

  public async invoke(
    name: string,
    isActive: boolean,
    recalculate: DeckSettingsRaw,
  ): Promise<Deck> {
    const deck = Deck.create(name, isActive, new DeckSettings(recalculate));

    await this.deckCommandRepository.create(deck);

    return deck;
  }
}
