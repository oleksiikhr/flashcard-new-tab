import CardCommandRepository from '../../../Domain/Modules/Card/Repository/CardCommandRepository';
import CardId from '../../../Domain/Modules/Card/CardId';
import TagId from '../../../Domain/Modules/Tag/TagId';
import DomainNotExistsError from '../../../Domain/Error/DomainNotExistsError';
import Card from '../../../Domain/Modules/Card/Card';
import Tag from '../../../Domain/Modules/Tag/Tag';
import CardQueryRepository from '../../../Domain/Modules/Card/Repository/CardQueryRepository';
import TagQueryRepository from '../../../Domain/Modules/Tag/Repository/TagQueryRepository';

export default class SyncCardTagsHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private cardQueryRepository: CardQueryRepository,
    private tagQueryRepository: TagQueryRepository,
  ) {}

  public async invoke(
    cardId: number,
    tagIds: number[],
  ): Promise<{ card: Card; tags: Tag[] }> {
    const card = await this.cardQueryRepository.findById(CardId.of(cardId));

    if (undefined === card) {
      throw new DomainNotExistsError(CardId.of(cardId));
    }

    const tags = await this.tagQueryRepository.findByIds(
      tagIds.map((tagId) => TagId.of(tagId)),
    );

    await this.cardCommandRepository.syncTags(card, tags);

    return { card, tags };
  }
}
