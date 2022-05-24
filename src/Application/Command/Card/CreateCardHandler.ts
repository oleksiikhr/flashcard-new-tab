import Card from '../../../Domain/Card/Card';
import CardCreator from '../../../Domain/Card/Service/CardCreator';
import DeckId from '../../../Domain/Deck/DeckId';
import CreateCardCommand from './CreateCardCommand';
import CardQuestion from '../../../Domain/Card/CardQuestion';
import CardTemplateType from '../../../Domain/Card/CardTemplateType';
import CardContentFactory from '../../../Domain/Card/Content/CardContentFactory';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DomainNotFoundError from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotFoundError';

export default class CreateCardHandler {
  constructor(
    private deckQueryRepository: DeckQueryRepository,
    private contentFactory: CardContentFactory,
    private creator: CardCreator
  ) {}

  public async invoke(command: CreateCardCommand): Promise<Card> {
    const deck = await this.deckQueryRepository.findById(
      DeckId.of(command.getDeckId())
    );

    if (undefined === deck) {
      throw new DomainNotFoundError();
    }

    const templateType = new CardTemplateType(command.getTemplateType());

    const content = this.contentFactory.make(
      command.getContent(),
      templateType
    );

    return this.creator.create(
      deck,
      new CardQuestion(command.getQuestion()),
      content,
      templateType
    );
  }
}
