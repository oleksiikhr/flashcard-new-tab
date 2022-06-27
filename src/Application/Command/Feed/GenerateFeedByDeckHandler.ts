import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import GenerateFeed from '../../../Domain/Feed/Service/GenerateFeed';
import DeckId from '../../../Domain/Deck/DeckId';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';

export default class GenerateFeedByDeckHandler {
  constructor(
    private deckQueryRepository: DeckQueryRepository,
    private generateFeed: GenerateFeed,
  ) {}

  public async invoke(deckId: number): Promise<void> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotExistsError(DeckId.of(deckId));
    }

    await this.generateFeed.generate(deck);
  }
}
