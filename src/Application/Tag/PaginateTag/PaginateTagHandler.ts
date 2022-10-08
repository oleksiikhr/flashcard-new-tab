import Tag from '../../../Domain/Modules/Tag/Tag';
import TagId from '../../../Domain/Modules/Tag/TagId';
import TagQueryRepository from '../../../Domain/Modules/Tag/Repository/TagQueryRepository';

export default class PaginateTagHandler {
  constructor(private tagQueryRepository: TagQueryRepository) {}

  public invoke(fromId: number | undefined, limit: number): Promise<Tag[]> {
    return this.tagQueryRepository.paginate(
      undefined !== fromId ? TagId.of(fromId) : undefined,
      limit,
    );
  }
}
