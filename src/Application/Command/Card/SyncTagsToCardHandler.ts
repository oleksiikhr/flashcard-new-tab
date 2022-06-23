import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import CardId from '../../../Domain/Card/CardId';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import TagId from '../../../Domain/Tag/TagId';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';

export default class SyncTagsToCardHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private cardQueryRepository: CardQueryRepository,
    private tagQueryRepository: TagQueryRepository,
  ) {}

  /**
   * @throws {DomainNotExistsError}
   * @throws {InvalidIdentifierError}
   */
  public async invoke(cardId: number, tagIds: number[]): Promise<void> {
    const card = await this.cardQueryRepository.findById(CardId.of(cardId));

    if (undefined === card) {
      throw new DomainNotExistsError(CardId.of(cardId));
    }

    const tags = await this.tagQueryRepository.findByIds(
      tagIds.map((tagId) => TagId.of(tagId)),
    );

    await this.cardCommandRepository.syncTags(card, tags);
  }
}
