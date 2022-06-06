import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import Card from '../../../Domain/Card/Card';
import CardId from '../../../Domain/Card/CardId';

export default class PaginateCardHandler {
  constructor(private queryRepository: CardQueryRepository) {}

  public invoke(fromId: number | undefined, limit: number): Promise<Card[]> {
    return this.queryRepository.paginate(
      undefined !== fromId ? CardId.of(fromId) : undefined,
      limit,
    );
  }
}
