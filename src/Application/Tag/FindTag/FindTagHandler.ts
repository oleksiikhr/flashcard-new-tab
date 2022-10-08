import Tag from '../../../Domain/Modules/Tag/Tag';
import TagId from '../../../Domain/Modules/Tag/TagId';
import TagQueryRepository from '../../../Domain/Modules/Tag/Repository/TagQueryRepository';

export default class FindTagHandler {
  constructor(private tagQueryRepository: TagQueryRepository) {}

  public invoke(id: number): Promise<Tag | undefined> {
    return this.tagQueryRepository.findById(TagId.of(id));
  }
}
