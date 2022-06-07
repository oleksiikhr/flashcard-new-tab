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

  async invoke(limit: number) {
    const decks = await this.deckQueryRepository.findGenerateAtUpperByNow(
      limit,
    );
    console.log('GenerateFeedHandler', decks);

    const promises = decks.map((deck) => {
      deck.updateGenerateAt();

      if (!deck.getIsActive() || !deck.getCardsCount()) {
        return this.deckCommandRepository.update(deck);
      }

      // find new feed
      // this.cardQueryRepository.findRandomByTagId()

      // 1000 -> settings deck_id=2
      // 100000 -> cards

      // clear exists feed by deckId
      // this.feedCommandRepository.deleteByDeckId(deck.getId() as DeckId);

      // push new feed
      // this.feedCommandRepository.create(new Feed())

      // resolve
      return this.deckCommandRepository.update(deck);
    });

    await Promise.all(promises);
  }
}
