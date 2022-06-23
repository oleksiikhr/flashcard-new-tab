import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';
import TagCommandRepository from '../../../Domain/Tag/Repository/TagCommandRepository';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import Tag from '../../../Domain/Tag/Tag';
import TagId from '../../../Domain/Tag/TagId';
import TagName from '../../../Domain/Tag/TagName';
import TagUniqueGate from '../../../Domain/Tag/Gate/TagUniqueGate';

export default class UpdateTagHandler {
  constructor(
    private commandRepository: TagCommandRepository,
    private queryRepository: TagQueryRepository,
    private tagUniqueTag: TagUniqueGate,
  ) {}

  /**
   * @throws {TagUniqueGateError}
   * @throws {DomainNotExistsError}
   * @throws {ObjectValueValidation}
   */
  public async invoke(id: number, name: string): Promise<Tag> {
    const tag = await this.queryRepository.findById(TagId.of(id));

    if (undefined === tag) {
      throw new DomainNotExistsError(TagId.of(id));
    }

    tag.from(new TagName(name));

    await this.tagUniqueTag.ensureTagIsUnique(tag.getDeckId(), tag.getName());

    await this.commandRepository.update(tag);

    return tag;
  }
}
