import Card from '../../../Domain/Modules/Card/Card';
import DeckId from '../../../Domain/Modules/Deck/DeckId';
import CardTemplateType from '../../../Domain/Modules/Card/ValueObject/CardTemplateType';
import CardVocabularyContent from '../../../Domain/Modules/Card/Content/CardVocabularyContent';
import DomainNotExistsError from '../../../Domain/Error/DomainNotExistsError';
import CardCommandRepository from '../../../Domain/Modules/Card/Repository/CardCommandRepository';
import DeckQueryRepository from '../../../Domain/Modules/Deck/Repository/DeckQueryRepository';

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
      question,
      CardVocabularyContent.create(answer),
      CardTemplateType.createVocabulary(),
      isActive,
    );

    await this.cardCommandRepository.create(card);

    return card;
  }
}
