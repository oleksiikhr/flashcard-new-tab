import Card from '../../../Domain/Card/Card';
import DeckId from '../../../Domain/Deck/DeckId';
import CardQuestion from '../../../Domain/Card/CardQuestion';
import CardTemplateType from '../../../Domain/Card/CardTemplateType';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import CardVocabularyContent from '../../../Domain/Card/Content/CardVocabularyContent';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';

export default class CreateVocabularyCardHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
  ) {}

  public async invoke(
    deckId: number,
    question: string,
    answer: string,
    isActive: boolean,
  ): Promise<Card> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotExistsError(DeckId.of(deckId));
    }

    const card = Card.create(
      deck.getId(),
      new CardQuestion(question),
      CardVocabularyContent.create(answer),
      CardTemplateType.createVocabulary(),
      isActive,
    );

    await this.cardCommandRepository.create(card);

    return card;
  }
}
