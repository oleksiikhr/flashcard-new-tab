import Card from '../Card';
import CardId from '../CardId';

export default interface CardQueryRepository {
  paginate(fromId: CardId | undefined, limit: number): Promise<Card[]>;

  findById(id: CardId): Promise<Card | undefined>;
}
