import Card from '../../../Domain/Card/Card';
import DeckId from '../../../Domain/Deck/DeckId';
import CardQuestion from '../../../Domain/Card/CardQuestion';
import CardTemplateType from '../../../Domain/Card/CardTemplateType';
import CardContentFactory from '../../../Domain/Card/Content/CardContentFactory';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DomainNotFoundError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotFoundError';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';

export default class CreateCardHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
    private contentFactory: CardContentFactory,
  ) {}

  public async invoke(
    deckId: number,
    question: string,
    content: object,
    templateType: number,
  ): Promise<Card> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotFoundError();
    }

    const cardTemplateType = new CardTemplateType(templateType);

    const cardContent = this.contentFactory.make(content, cardTemplateType);

    const card = Card.create(
      deck,
      new CardQuestion(question),
      cardContent,
      cardTemplateType,
    );

    await this.cardCommandRepository.create(card);

    return card;
  }
}
