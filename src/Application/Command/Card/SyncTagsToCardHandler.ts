import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import CardId from '../../../Domain/Card/CardId';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import TagId from '../../../Domain/Tag/TagId';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';
import Card from '../../../Domain/Card/Card';
import Tag from '../../../Domain/Tag/Tag';

export default class SyncTagsToCardHandler {
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
