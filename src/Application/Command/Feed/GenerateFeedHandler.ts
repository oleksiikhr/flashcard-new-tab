import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DeckCommandRepository from '../../../Domain/Deck/Repository/DeckCommandRepository';
import CardQueryRepository from '../../../Domain/Card/Repository/CardQueryRepository';
import FeedCommandRepository from '../../../Domain/Feed/Repository/FeedCommandRepository';

export default class GenerateFeedHandler {
  constructor(
    private deckCommandRepository: DeckCommandRepository,
    private feedCommandRepository: FeedCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
    private cardQueryRepository: CardQueryRepository,
  ) {}

  public async invoke(limit: number) {
    const decks = await this.deckQueryRepository.findGenerateAtUpperByNow(
      limit,
    );

    const promises = decks.map((deck) => {
      deck.nextGenerateAt();

      if (!deck.getIsActive() || !deck.getCardsCount()) {
        return this.deckCommandRepository.update(deck);
      }

      return this.feedCommandRepository
        .deleteByDeckId(deck.getId())
        .then(() =>
          this.cardQueryRepository.findRandomActiveByDeckId(
            deck.getId(),
            7, // TODO deck.settings
          ),
        )
        .then((cards) =>
          Promise.all(
            cards.map((card) => this.feedCommandRepository.create(card)),
          ),
        )
        .then(() => this.deckCommandRepository.update(deck));
    });

    await Promise.all(promises);
  }
}
