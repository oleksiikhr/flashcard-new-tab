import FeedQueryRepository from '../../../Domain/Feed/Repository/FeedQueryRepository';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import Feed from '../../../Domain/Feed/Feed';

export default class FindRandomFeedHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private queryRepository: FeedQueryRepository,
  ) {}

  public async invoke(): Promise<Feed | undefined> {
    const feed = await this.queryRepository.findRandom();

    if (undefined === feed) {
      return undefined;
    }

    const card = feed.getCard();
    card.updateLastSeen();

    await this.cardCommandRepository.update(card);

    return feed;
  }
}
