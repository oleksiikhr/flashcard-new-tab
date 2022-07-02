import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import GenerateFeed from '../../../Domain/Feed/Service/GenerateFeed';
import Logger from '../../../Domain/Shared/Service/Logger';
import Deck from '../../../Domain/Deck/Deck';
import Card from '../../../Domain/Card/Card';

export default class GenerateFeedHandler {
  constructor(
    private deckQueryRepository: DeckQueryRepository,
    private generateFeed: GenerateFeed,
    private logger: Logger,
  ) {}

  public async invoke(
    limit: number,
    cb?: (deck: Deck) => void,
  ): Promise<{ deck: Deck; cards: Card[] }[]> {
    const decks = await this.deckQueryRepository.findGenerateAtUpperByNow(
      limit,
    );

    this.logger.info('Feed', this.constructor.name, 'invoke', { decks, limit });

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
