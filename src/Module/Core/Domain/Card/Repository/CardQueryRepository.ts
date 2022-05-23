import Card from '../Card';
import CardId from '../CardId';

export interface CardQueryRepository {
  findById(id: CardId): Promise<Card | undefined>;
}
