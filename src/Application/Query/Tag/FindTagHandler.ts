import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import Tag from '../../../Domain/Tag/Tag';
import TagId from '../../../Domain/Tag/TagId';

export default class FindTagHandler {
  constructor(private queryRepository: TagQueryRepository) {}

  public invoke(id: number): Promise<Tag | undefined> {
    return this.queryRepository.findById(TagId.of(id));
  }
}
