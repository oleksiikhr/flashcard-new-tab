import Card from '../Card';
import CardId from '../CardId';

export default interface CardQueryRepository {
  findById(id: CardId): Promise<Card | undefined>;

  // findRandomByTagId(tagId: TagId): Promise<CardId[] | undefined>;
}
