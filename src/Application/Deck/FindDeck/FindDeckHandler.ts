import Deck from '../../../Domain/Modules/Deck/Deck';
import DeckId from '../../../Domain/Modules/Deck/DeckId';
import DeckQueryRepository from '../../../Domain/Modules/Deck/Repository/DeckQueryRepository';

export default class FindDeckHandler {
  constructor(private deckQueryRepository: DeckQueryRepository) {}

  public invoke(id: number): Promise<Deck | undefined> {
    return this.deckQueryRepository.findById(DeckId.of(id));
  }
}
