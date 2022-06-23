import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import CardId from '../../../Domain/Card/CardId';
import Card from '../../../Domain/Card/Card';

export default class IncreaseCardClicksHandler {
  constructor(
    private commandRepository: CardCommandRepository,
    private queryRepository: CardQueryRepository,
  ) {}

  /**
   * @throws {DomainNotExistsError}
   */
  public async invoke(id: number, value = 1): Promise<Card> {
    const card = await this.queryRepository.findById(CardId.of(id));

    if (undefined === card) {
      throw new DomainNotExistsError(CardId.of(id));
    }

    card.getStatistics().increaseClicks(value);

    await this.commandRepository.update(card);

    return card;
  }
}
