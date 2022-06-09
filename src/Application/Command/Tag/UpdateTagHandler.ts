import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';
import TagCommandRepository from '../../../Domain/Tag/Repository/TagCommandRepository';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import Tag from '../../../Domain/Tag/Tag';
import TagId from '../../../Domain/Tag/TagId';
import TagName from '../../../Domain/Tag/TagName';

export default class UpdateTagHandler {
  constructor(
    private commandRepository: TagCommandRepository,
    private queryRepository: TagQueryRepository,
  ) {}

  public async invoke(id: number, name: string): Promise<Tag> {
    const tag = await this.queryRepository.findById(TagId.of(id));

    if (undefined === tag) {
      throw new DomainNotExistsError();
    }

    tag.from(new TagName(name));

    await this.commandRepository.update(tag);

    return tag;
  }
}
