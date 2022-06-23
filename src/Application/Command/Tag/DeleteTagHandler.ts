import TagCommandRepository from '../../../Domain/Tag/Repository/TagCommandRepository';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import TagId from '../../../Domain/Tag/TagId';

export default class DeleteTagHandler {
  constructor(
    private commandRepository: TagCommandRepository,
    private queryRepository: TagQueryRepository,
  ) {}

  /**
   * @throws {InvalidIdentifierError}
   */
  public async invoke(id: number): Promise<void> {
    const tag = await this.queryRepository.findById(TagId.of(id));

    if (undefined === tag) {
      return Promise.resolve();
    }

    return this.commandRepository.delete(tag);
  }
}
