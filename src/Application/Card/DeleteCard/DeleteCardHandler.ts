import CardId from '../../../Domain/Modules/Card/CardId';
import Card from '../../../Domain/Modules/Card/Card';
import CardCommandRepository from '../../../Domain/Modules/Card/Repository/CardCommandRepository';
import CardQueryRepository from '../../../Domain/Modules/Card/Repository/CardQueryRepository';

export default class DeleteCardHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private cardQueryRepository: CardQueryRepository,
  ) {}

  public async invoke(id: number): Promise<Card | undefined> {
    const card = await this.cardQueryRepository.findById(CardId.of(id));

    if (undefined === card) {
      return Promise.resolve(undefined);
    }

    await this.cardCommandRepository.delete(card);

    return card;
  }
}
