import Card from '../../../Domain/Card/Card';
import DeckId from '../../../Domain/Deck/DeckId';
import CardQuestion from '../../../Domain/Card/CardQuestion';
import CardTemplateType from '../../../Domain/Card/CardTemplateType';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DomainNotFoundError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotFoundError';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import CardVocabularyContent from '../../../Domain/Card/Content/CardVocabularyContent';

export default class CreateVocabularyCardHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
  ) {}

  public async invoke(
    deckId: number,
    question: string,
    answer: string,
    transcription: string,
  ): Promise<Card> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(deckId));

    if (undefined === deck) {
      throw new DomainNotFoundError();
    }

    const content = new CardVocabularyContent({
      answer,
      transcription,
    });

    const card = Card.create(
      deck.getId(),
      new CardQuestion(question),
      content,
      CardTemplateType.createVocabulary(),
    );

    await this.cardCommandRepository.create(card);

    return card;
  }
}
