import TagCommandRepository from '../../../Domain/Modules/Tag/Repository/TagCommandRepository';
import TagId from '../../../Domain/Modules/Tag/TagId';
import Tag from '../../../Domain/Modules/Tag/Tag';
import TagQueryRepository from '../../../Domain/Modules/Tag/Repository/TagQueryRepository';

export default class DeleteTagHandler {
  constructor(
    private tagCommandRepository: TagCommandRepository,
    private tagQueryRepository: TagQueryRepository,
  ) {}

  public async invoke(id: number): Promise<Tag | undefined> {
    const tag = await this.tagQueryRepository.findById(TagId.of(id));

    if (undefined === tag) {
      return Promise.resolve(undefined);
    }

    await this.tagCommandRepository.delete(tag);

    return tag;
  }
}
