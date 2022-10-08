import Deck from '../../../Domain/Modules/Deck/Deck';
import DeckId from '../../../Domain/Modules/Deck/DeckId';
import DeckQueryRepository from '../../../Domain/Modules/Deck/Repository/DeckQueryRepository';

export default class PaginateDeckHandler {
  constructor(private deckQueryRepository: DeckQueryRepository) {}

  public invoke(fromId: number | undefined, limit: number): Promise<Deck[]> {
    return this.deckQueryRepository.paginate(
      undefined !== fromId ? DeckId.of(fromId) : undefined,
      limit,
    );
  }
}
