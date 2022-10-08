import GenerateFeed from '../../../Domain/Modules/Feed/Service/GenerateFeed';
import DeckId from '../../../Domain/Modules/Deck/DeckId';
import DomainNotExistsError from '../../../Domain/Error/DomainNotExistsError';
import Deck from '../../../Domain/Modules/Deck/Deck';
import Card from '../../../Domain/Modules/Card/Card';
import DeckQueryRepository from '../../../Domain/Modules/Deck/Repository/DeckQueryRepository';

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
