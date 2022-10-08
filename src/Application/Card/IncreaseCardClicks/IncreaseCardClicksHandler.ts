import DomainNotExistsError from '../../../Domain/Error/DomainNotExistsError';
import CardCommandRepository from '../../../Domain/Modules/Card/Repository/CardCommandRepository';
import CardId from '../../../Domain/Modules/Card/CardId';
import Card from '../../../Domain/Modules/Card/Card';
import CardQueryRepository from '../../../Domain/Modules/Card/Repository/CardQueryRepository';

export default class IncreaseCardClicksHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private cardQueryRepository: CardQueryRepository,
  ) {}

  public async invoke(id: number, value = 1): Promise<Card> {
    const card = await this.cardQueryRepository.findById(CardId.of(id));

    if (undefined === card) {
      throw new DomainNotExistsError(CardId.of(id));
    }

    card.getStatistics().increaseClicks(value);

    await this.cardCommandRepository.update(card);

    return card;
  }
}
