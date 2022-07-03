import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import Card from '../../../Domain/Card/Card';
import CardId from '../../../Domain/Card/CardId';

export default class FindCardHandler {
  constructor(private queryRepository: CardQueryRepository) {}

  public invoke(id: number): Promise<Card | undefined> {
    return this.queryRepository.findById(CardId.of(id));
  }
}
