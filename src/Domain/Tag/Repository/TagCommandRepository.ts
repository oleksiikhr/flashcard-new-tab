import Tag from '../Tag';

export default interface TagCommandRepository {
  create(tag: Tag): Promise<void>;

  update(tag: Tag): Promise<void>;

  delete(tag: Tag): Promise<void>;
}
