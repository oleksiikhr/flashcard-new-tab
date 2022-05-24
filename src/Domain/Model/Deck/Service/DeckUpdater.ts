import Deck from '../Deck';
import DeckName from '../DeckName';
import DeckSettings from '../DeckSettings';
import DeckCommandRepository from '../Repository/DeckCommandRepository';
import DeckId from '../DeckId';
import DeckQueryRepository from '../Repository/DeckQueryRepository';
import DomainDoesNotExistsError from '../../../../Infrastructure/Persistence/IndexedDB/Error/DomainDoesNotExistsError';

export default class DeckUpdater {
  constructor(
    private commandRepository: DeckCommandRepository,
    private queryRepository: DeckQueryRepository
  ) {}

  public async update(
    id: DeckId,
    name: DeckName,
    isActive: boolean,
    settings: DeckSettings
  ): Promise<Deck> {
    const deck = await this.queryRepository.findById(id);

    if (undefined === deck) {
      throw new DomainDoesNotExistsError();
    }

    deck.from(name, isActive, settings);

    await this.commandRepository.update(deck);

    return deck;
  }
}
