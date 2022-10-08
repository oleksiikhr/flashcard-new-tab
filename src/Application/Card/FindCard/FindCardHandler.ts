import Card from '../../../Domain/Modules/Card/Card';
import CardId from '../../../Domain/Modules/Card/CardId';
import CardQueryRepository from '../../../Domain/Modules/Card/Repository/CardQueryRepository';

export default class FindCardHandler {
  constructor(private cardQueryRepository: CardQueryRepository) {}

  public invoke(id: number): Promise<Card | undefined> {
    return this.cardQueryRepository.findById(CardId.of(id));
  }
}
