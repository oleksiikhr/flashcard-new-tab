import FeedQueryRepository from '../../../Domain/Feed/Repository/FeedQueryRepository';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import Feed from '../../../Domain/Feed/Feed';

export default class FindRandomFeedHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private cardQueryRepository: CardQueryRepository,
    private deckQueryRepository: DeckQueryRepository,
    private queryRepository: FeedQueryRepository,
  ) {}

  public async invoke(): Promise<Feed | undefined> {
    const feed = await this.queryRepository.findRandom();

    if (undefined === feed) {
      return undefined;
    }

    const card = feed.getCard();
    card.getStatistics().increaseViews();
    await this.cardCommandRepository.update(card);

    return feed;
  }
}
