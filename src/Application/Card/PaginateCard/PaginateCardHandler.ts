import Card from '../../../Domain/Modules/Card/Card';
import CardId from '../../../Domain/Modules/Card/CardId';
import CardQueryRepository from '../../../Domain/Modules/Card/Repository/CardQueryRepository';

export default class PaginateCardHandler {
  constructor(private cardQueryRepository: CardQueryRepository) {}

  public invoke(fromId: number | undefined, limit: number): Promise<Card[]> {
    return this.cardQueryRepository.paginate(
      undefined !== fromId ? CardId.of(fromId) : undefined,
      limit,
    );
  }
}
