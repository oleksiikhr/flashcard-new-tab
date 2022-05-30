import GenerateFeedCommand from './GenerateFeedCommand';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DeckCommandRepository from '../../../Domain/Deck/Repository/DeckCommandRepository';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import DeckId from '../../../Domain/Deck/DeckId';

export default class GenerateFeedHandler {
  constructor(
    private deckCommandRepository: DeckCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
    private tagQueryRepository: TagQueryRepository
  ) {}

  async invoke(command: GenerateFeedCommand) {
    const decks = await this.deckQueryRepository.findGenerateAtUpperByNow(
      command.getLimit()
    );
    console.log(decks);

    decks.forEach((deck) => {
      deck.updateGenerateAt();

      // if (!deck.getIsActive() || !deck.getCardsCount()) {
      //   return;
      // }

      this.tagQueryRepository
        .findActiveByDeckId(deck.getId() as DeckId)
        .then(console.log)
        .catch(console.error);

      // clear exists feed

      // push new feed

      // this.deckCommandRepository.update(deck);
    });
  }
}
