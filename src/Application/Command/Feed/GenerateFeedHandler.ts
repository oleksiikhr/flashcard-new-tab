import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import GenerateFeed from '../../../Domain/Feed/Service/GenerateFeed';

export default class GenerateFeedHandler {
  constructor(
    private deckQueryRepository: DeckQueryRepository,
    private generateFeed: GenerateFeed,
  ) {}

  public async invoke(limit: number): Promise<void> {
    const decks = await this.deckQueryRepository.findGenerateAtUpperByNow(
      limit,
    );

    const promises = decks.map((deck) => this.generateFeed.generate(deck));

    await Promise.all(promises);
  }
}
