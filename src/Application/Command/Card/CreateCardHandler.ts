import Card from '../../../Domain/Card/Card';
import DeckId from '../../../Domain/Deck/DeckId';
import CardQuestion from '../../../Domain/Card/CardQuestion';
import CardTemplateType from '../../../Domain/Card/CardTemplateType';
import CardContentFactory from '../../../Domain/Card/Content/CardContentFactory';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DomainNotFoundError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotFoundError';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import TagId from '../../../Domain/Tag/TagId';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';

export default class CreateCardHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
    private tagQueryRepository: TagQueryRepository,
    private contentFactory: CardContentFactory,
  ) {}

  public async invoke(
    deckId: number,
    question: string,
    content: object,
    templateType: number,
    tagIds: number[],
  ): Promise<Card> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotFoundError();
    }

    const tags = await this.tagQueryRepository.findByIds(
      tagIds.map((tagId) => TagId.of(tagId)),
    );

    const cardTemplateType = new CardTemplateType(templateType);

    const cardContent = this.contentFactory.make(content, cardTemplateType);

    const card = Card.create(
      deck,
      new CardQuestion(question),
      cardContent,
      cardTemplateType,
      tags,
    );

    await this.cardCommandRepository.create(card);

    return card;
  }
}
