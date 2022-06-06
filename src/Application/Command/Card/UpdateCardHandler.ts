import Card from '../../../Domain/Card/Card';
import CardQuestion from '../../../Domain/Card/CardQuestion';
import CardTemplateType from '../../../Domain/Card/CardTemplateType';
import CardContentFactory from '../../../Domain/Card/Content/CardContentFactory';
import CardCommandRepository from '../../../Domain/Card/Repository/CardCommandRepository';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import CardId from '../../../Domain/Card/CardId';
import DomainNotExistsError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';

export default class UpdateCardHandler {
  constructor(
    private commandRepository: CardCommandRepository,
    private queryRepository: CardQueryRepository,
    private contentFactory: CardContentFactory,
  ) {}

  public async invoke(
    id: number,
    question: string,
    content: object,
    templateType: number,
  ): Promise<Card> {
    const card = await this.queryRepository.findById(CardId.of(id));

    if (undefined === card) {
      throw new DomainNotExistsError();
    }

    const cardTemplateType = new CardTemplateType(templateType);

    const cardContent = this.contentFactory.make(content, cardTemplateType);

    card.from(new CardQuestion(question), cardContent, cardTemplateType);

    await this.commandRepository.update(card);

    return card;
  }
}
