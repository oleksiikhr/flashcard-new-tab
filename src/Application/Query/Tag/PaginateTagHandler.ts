import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import Tag from '../../../Domain/Tag/Tag';
import TagId from '../../../Domain/Tag/TagId';

export default class PaginateTagHandler {
  constructor(private queryRepository: TagQueryRepository) {}

  public invoke(fromId: number | undefined, limit: number): Promise<Tag[]> {
    return this.queryRepository.paginate(
      undefined !== fromId ? TagId.of(fromId) : undefined,
      limit,
    );
  }
}
