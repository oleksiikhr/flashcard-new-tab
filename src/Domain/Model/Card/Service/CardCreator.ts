import { CardCommandRepository } from '../Repository/CardCommandRepository';
import Card from '../Card';
import CardQuestion from '../CardQuestion';
import CardContent from '../Content/CardContent';
import CardTemplateType from '../CardTemplateType';
import Deck from '../../Deck/Deck';

export default class CardCreator {
  constructor(private commandRepository: CardCommandRepository) {}

  public async create(
    deck: Deck,
    question: CardQuestion,
    content: CardContent,
    templateType: CardTemplateType
  ): Promise<Card> {
    deck.incrementCardsCount();

    const card = Card.create(deck, question, content, templateType);

    await this.commandRepository.create(card);

    return card;
  }
}
