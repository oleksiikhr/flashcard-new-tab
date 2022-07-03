import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import GenerateFeed from '../../../Domain/Feed/Service/GenerateFeed';
import DeckId from '../../../Domain/Deck/DeckId';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';
import Deck from '../../../Domain/Deck/Deck';
import Card from '../../../Domain/Card/Card';

export default class GenerateFeedByDeckHandler {
  constructor(
    private deckQueryRepository: DeckQueryRepository,
    private generateFeed: GenerateFeed,
  ) {}

  public async invoke(deckId: number): Promise<{ deck: Deck; cards: Card[] }> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotExistsError(DeckId.of(deckId));
    }

    return this.generateFeed.generate(deck);
  }
}
