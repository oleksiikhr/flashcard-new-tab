import Deck from '../../Deck/Deck';
import DeckCommandRepository from '../../Deck/Repository/DeckCommandRepository';
import CardQueryRepository from '../../Card/Repository/CardQueryRepository';
import FeedCommandRepository from '../Repository/FeedCommandRepository';
import Card from '../../Card/Card';
import Logger from '../../../Service/Logger';

export default class GenerateFeed {
  constructor(
    private feedCommandRepository: FeedCommandRepository,
    private deckCommandRepository: DeckCommandRepository,
    private cardQueryRepository: CardQueryRepository,
    private logger: Logger,
  ) {}

  public generate(deck: Deck): Promise<{ deck: Deck; cards: Card[] }> {
    deck.nextGenerateAt();

    if (!deck.getIsActive() || !deck.getActiveCardsCount()) {
      return this.deckCommandRepository.update(deck).then(() => {
        this.logger.debug('Feed', 'generate', 'update empty deck');

        return { deck, cards: [] };
      });
    }

    return this.cardQueryRepository
      .findRandomActiveByDeckId(
        deck.getId(),
        deck.getSettings().getRecalculate().count,
      )
      .then((cards) => {
        this.logger.debug('Feed', 'generate', 'find random cards', {
          cards,
        });

        return this.feedCommandRepository.deleteByDeck(deck).then(() => cards);
      })
      .then((cards) => {
        this.logger.debug('Feed', 'generate', 'delete by deck', {
          deck,
        });

        return Promise.all(
          cards.map((card) => this.feedCommandRepository.create(card)),
        ).then(() => cards);
      })
      .then((cards) => {
        this.logger.debug('Feed', 'generate', 'create cards');

        return this.deckCommandRepository
          .update(deck)
          .then(() => ({ deck, cards }));
      })
      .then((data) => {
        this.logger.debug('Feed', 'generate', 'update deck');

        return data;
      });
  }
}
