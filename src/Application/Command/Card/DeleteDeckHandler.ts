import CardId from '../../../Domain/Card/CardId';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';

export default class DeleteCardHandler {
  constructor(
    private commandRepository: CardCommandRepository,
    private queryRepository: CardQueryRepository,
  ) {}

  public async invoke(id: number): Promise<void> {
    const card = await this.queryRepository.findById(CardId.of(id));

    if (undefined === card) {
      return Promise.resolve();
    }

    return this.commandRepository.delete(card);
  }
}
