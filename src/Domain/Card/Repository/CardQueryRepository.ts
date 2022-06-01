import Card from '../Card';
import CardId from '../CardId';
import TagId from '../../Tag/TagId';

export interface CardQueryRepository {
  findById(id: CardId): Promise<Card | undefined>;

  // findRandomByTagId(tagId: TagId): Promise<CardId[] | undefined>;
}
