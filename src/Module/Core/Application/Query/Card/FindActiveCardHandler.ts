import FindActiveCardCommand from './FindActiveCardCommand';
import { CardQueryRepository } from '../../../Domain/Card/Repository/CardQueryRepository';
import CardId from '../../../Domain/Card/CardId';
import Card from '../../../Domain/Card/Card';
import { CardCommandRepository } from '../../../Domain/Card/Repository/CardCommandRepository';

export default class FindActiveCardHandler {
  constructor(
    private commandRepository: CardCommandRepository,
    private queryRepository: CardQueryRepository
  ) {}

  public async invoke(
    command: FindActiveCardCommand
  ): Promise<Card | undefined> {
    const card = await this.queryRepository.findById(CardId.of(1)); // TODO

    if (undefined === card) {
      return card;
    }

    card.getStatistics().increaseViews();

    await this.commandRepository.update(card);

    return card;
  }
}
