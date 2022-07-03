import Card from '../../../Domain/Card/Card';
import CardQuestion from '../../../Domain/Card/CardQuestion';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import CardId from '../../../Domain/Card/CardId';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';
import CardVocabularyContent from '../../../Domain/Card/Content/CardVocabularyContent';

export default class UpdateVocabularyCardHandler {
  constructor(
    private commandRepository: CardCommandRepository,
    private queryRepository: CardQueryRepository,
  ) {}

  public async invoke(
    id: number,
    question: string,
    answer: string,
    isActive: boolean,
  ): Promise<Card> {
    const card = await this.queryRepository.findById(CardId.of(id));

    if (undefined === card) {
      throw new DomainNotExistsError(CardId.of(id));
    }

    card.from(
      new CardQuestion(question),
      CardVocabularyContent.create(answer),
      isActive,
    );

    await this.commandRepository.update(card);

    return card;
  }
}
