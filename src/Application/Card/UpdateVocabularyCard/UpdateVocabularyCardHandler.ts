import Card from '../../../Domain/Modules/Card/Card';
import CardCommandRepository from '../../../Domain/Modules/Card/Repository/CardCommandRepository';
import CardId from '../../../Domain/Modules/Card/CardId';
import DomainNotExistsError from '../../../Domain/Error/DomainNotExistsError';
import CardVocabularyContent from '../../../Domain/Modules/Card/Content/CardVocabularyContent';
import CardQueryRepository from '../../../Domain/Modules/Card/Repository/CardQueryRepository';

export default class UpdateVocabularyCardHandler {
  constructor(
    private cardCommandRepository: CardCommandRepository,
    private cardQueryRepository: CardQueryRepository,
  ) {}

  public async invoke(
    id: number,
    question: string,
    answer: string,
    isActive: boolean,
  ): Promise<Card> {
    const card = await this.cardQueryRepository.findById(CardId.of(id));

    if (undefined === card) {
      throw new DomainNotExistsError(CardId.of(id));
    }

    card.update(question, CardVocabularyContent.create(answer), isActive);

    await this.cardCommandRepository.update(card);

    return card;
  }
}
