import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import Deck from '../../../Domain/Deck/Deck';
import DeckId from '../../../Domain/Deck/DeckId';

export default class FindDeckHandler {
  constructor(private queryRepository: DeckQueryRepository) {}

  public invoke(id: number): Promise<Deck | undefined> {
    return this.queryRepository.findById(DeckId.of(id));
  }
}
