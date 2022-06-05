import FeedQueryRepository from '../../../Domain/Feed/Repository/FeedQueryRepository';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import Card from '../../../Domain/Card/Card';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';

export default class FindFeedHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private cardQueryRepository: CardQueryRepository,
    private queryRepository: FeedQueryRepository,
  ) {}

  public async invoke(): Promise<Card | undefined> {
    const cardId = await this.queryRepository.findRandom();

    if (undefined === cardId) {
      return undefined;
    }

    const card = await this.cardQueryRepository.findById(cardId);

    if (undefined === card) {
      return undefined;
    }

    card.updateLastView();

    await this.cardCommandRepository.update(card);

    return card;
  }
}
