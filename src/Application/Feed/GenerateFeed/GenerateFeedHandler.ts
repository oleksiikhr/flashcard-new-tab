import GenerateFeed from '../../../Domain/Modules/Feed/Service/GenerateFeed';
import Deck from '../../../Domain/Modules/Deck/Deck';
import Card from '../../../Domain/Modules/Card/Card';
import DeckQueryRepository from '../../../Domain/Modules/Deck/Repository/DeckQueryRepository';

export default class GenerateFeedHandler {
  constructor(
    private deckQueryRepository: DeckQueryRepository,
    private generateFeed: GenerateFeed,
  ) {}

  public async invoke(
    limit: number,
    cb?: (deck: Deck) => void,
  ): Promise<{ deck: Deck; cards: Card[] }[]> {
    const decks = await this.deckQueryRepository.findGenerateAtUpperByNow(
      limit,
    );

    const promises = decks.map((deck) =>
      this.generateFeed.generate(deck).then((data) => {
        if (undefined !== cb) {
          cb(deck);
        }

        return data;
      }),
    );

    return Promise.all(promises);
  }
}
