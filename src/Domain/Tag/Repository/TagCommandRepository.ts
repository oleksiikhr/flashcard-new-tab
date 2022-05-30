import Tag from '../Tag';
import TagId from '../TagId';

export default interface TagCommandRepository {
  create(tag: Tag): Promise<void>;

  update(tag: Tag): Promise<void>;

  delete(id: TagId): Promise<void>;
}
