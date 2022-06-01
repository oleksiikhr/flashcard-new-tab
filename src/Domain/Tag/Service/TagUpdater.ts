import TagId from '../TagId';
import TagName from '../TagName';
import Tag from '../Tag';
import TagCommandRepository from '../Repository/TagCommandRepository';
import TagQueryRepository from '../Repository/TagQueryRepository';
import DomainDoesNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainDoesNotExistsError';

export default class TagUpdater {
  constructor(
    private commandRepository: TagCommandRepository,
    private queryRepository: TagQueryRepository,
  ) {}

  public async update(
    id: TagId,
    name: TagName,
    isActive: boolean,
  ): Promise<Tag> {
    const tag = await this.queryRepository.findById(id);

    if (undefined === tag) {
      throw new DomainDoesNotExistsError();
    }

    tag.from(name, isActive);

    await this.commandRepository.update(tag);

    return tag;
  }
}
