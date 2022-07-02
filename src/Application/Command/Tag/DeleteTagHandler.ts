import TagCommandRepository from '../../../Domain/Tag/Repository/TagCommandRepository';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import TagId from '../../../Domain/Tag/TagId';
import Tag from '../../../Domain/Tag/Tag';

export default class DeleteTagHandler {
  constructor(
    private commandRepository: TagCommandRepository,
    private queryRepository: TagQueryRepository,
  ) {}

  public async invoke(id: number): Promise<Tag | undefined> {
    const tag = await this.queryRepository.findById(TagId.of(id));

    if (undefined === tag) {
      return Promise.resolve(undefined);
    }

    await this.commandRepository.delete(tag);

    return tag;
  }
}
