import Deck from '../../../Domain/Deck/Deck';
import DeckName from '../../../Domain/Deck/DeckName';
import DeckSettings, {
  DeckSettingsRaw,
} from '../../../Domain/Deck/DeckSettings';
import DeckCommandRepository from '../../../Domain/Deck/Repository/DeckCommandRepository';

export default class CreateDeckHandler {
  constructor(private commandRepository: DeckCommandRepository) {}

  public async invoke(
    name: string,
    isActive: boolean,
    recalculate: DeckSettingsRaw,
  ): Promise<Deck> {
    const deck = Deck.create(
      new DeckName(name),
      isActive,
      new DeckSettings(recalculate),
    );

    await this.commandRepository.create(deck);

    return deck;
  }
}
