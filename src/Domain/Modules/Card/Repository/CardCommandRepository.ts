import Card from '../Card';
import Tag from '../../Tag/Tag';

export default interface CardCommandRepository {
  create(card: Card): Promise<void>;

  update(card: Card): Promise<void>;

  delete(card: Card): Promise<void>;

  syncTags(card: Card, tags: Tag[]): Promise<void>;
}
