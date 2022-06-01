import Deck from '../Deck';
import DeckName from '../DeckName';
import DeckSettings from '../DeckSettings';
import DeckCommandRepository from '../Repository/DeckCommandRepository';

export default class DeckCreator {
  constructor(private commandRepository: DeckCommandRepository) {}

  public async create(
    name: DeckName,
    isActive: boolean,
    settings: DeckSettings,
  ): Promise<Deck> {
    const deck = Deck.create(name, isActive, settings);

    await this.commandRepository.create(deck);

    return deck;
  }
}
