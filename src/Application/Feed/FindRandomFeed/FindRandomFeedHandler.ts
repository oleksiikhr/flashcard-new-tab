import CardCommandRepository from '../../../Domain/Modules/Card/Repository/CardCommandRepository';
import Feed from '../../../Domain/Modules/Feed/Feed';
import FeedQueryRepository from '../../../Domain/Modules/Feed/Repository/FeedQueryRepository';

export default class FindRandomFeedHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private feedQueryRepository: FeedQueryRepository,
  ) {}

  public async invoke(): Promise<Feed | undefined> {
    const feed = await this.feedQueryRepository.findRandom();

    if (undefined === feed) {
      return undefined;
    }

    const card = feed.getCard();
    card.updateLastSeen();

    await this.cardCommandRepository.update(card);

    return feed;
  }
}
