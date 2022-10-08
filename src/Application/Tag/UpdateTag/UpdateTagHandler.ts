import DomainNotExistsError from '../../../Domain/Error/DomainNotExistsError';
import TagCommandRepository from '../../../Domain/Modules/Tag/Repository/TagCommandRepository';
import Tag from '../../../Domain/Modules/Tag/Tag';
import TagId from '../../../Domain/Modules/Tag/TagId';
import TagQueryRepository from '../../../Domain/Modules/Tag/Repository/TagQueryRepository';

export default class UpdateTagHandler {
  constructor(
    private tagCommandRepository: TagCommandRepository,
    private tagQueryRepository: TagQueryRepository,
  ) {}

  public async invoke(id: number, name: string): Promise<Tag> {
    const tag = await this.tagQueryRepository.findById(TagId.of(id));

    if (undefined === tag) {
      throw new DomainNotExistsError(TagId.of(id));
    }

    await tag.update(name, this.tagQueryRepository);

    await this.tagCommandRepository.update(tag);

    return tag;
  }
}
