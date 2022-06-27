import Deck from '../../Deck/Deck';
import DeckCommandRepository from '../../Deck/Repository/DeckCommandRepository';
import CardQueryRepository from '../../Card/Repository/CardQueryRepository';
import FeedCommandRepository from '../Repository/FeedCommandRepository';

export default class GenerateFeed {
  constructor(
    private feedCommandRepository: FeedCommandRepository,
    private deckCommandRepository: DeckCommandRepository,
    private cardQueryRepository: CardQueryRepository,
  ) {}

  public generate(deck: Deck): Promise<void> {
    deck.nextGenerateAt();

    if (!deck.getIsActive() || !deck.getActiveCardsCount()) {
      return this.deckCommandRepository.update(deck);
    }

    return this.cardQueryRepository
      .findRandomActiveByDeckId(
        deck.getId(),
        deck.getSettings().getRecalculate().count,
      )
      .then((cards) =>
        this.feedCommandRepository.deleteByDeck(deck).then(() => cards),
      )
      .then((cards) =>
        Promise.all(
          cards.map((card) => this.feedCommandRepository.create(card)),
        ),
      )
      .then(() => this.deckCommandRepository.update(deck));
  }
}
