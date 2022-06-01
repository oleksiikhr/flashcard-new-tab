import TagCommandRepository from '../Repository/TagCommandRepository';
import TagQueryRepository from '../Repository/TagQueryRepository';
import TagId from '../TagId';

export default class TagDeleter {
  constructor(
    private commandRepository: TagCommandRepository,
    private queryRepository: TagQueryRepository,
  ) {}

  public async delete(id: TagId): Promise<void> {
    const tag = await this.queryRepository.findById(id);

    if (undefined === tag) {
      return;
    }

    // TODO Delete card_tag rows

    await this.commandRepository.delete(id);
  }
}
