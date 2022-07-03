import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import Deck from '../../../Domain/Deck/Deck';
import DeckId from '../../../Domain/Deck/DeckId';

export default class PaginateDeckHandler {
  constructor(private queryRepository: DeckQueryRepository) {}

  public invoke(fromId: number | undefined, limit: number): Promise<Deck[]> {
    return this.queryRepository.paginate(
      undefined !== fromId ? DeckId.of(fromId) : undefined,
      limit,
    );
  }
}
