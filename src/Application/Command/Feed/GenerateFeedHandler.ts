import GenerateFeedCommand from './GenerateFeedCommand';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DeckCommandRepository from '../../../Domain/Deck/Repository/DeckCommandRepository';
import TagQueryRepository from '../../../Domain/Tag/Repository/TagQueryRepository';
import DeckId from '../../../Domain/Deck/DeckId';
import { CardQueryRepository } from '../../../Domain/Card/Repository/CardQueryRepository';
import FeedCommandRepository from '../../../Domain/Feed/Repository/FeedCommandRepository';
import CardId from '../../../Domain/Card/CardId';

export default class GenerateFeedHandler {
  constructor(
    private deckCommandRepository: DeckCommandRepository,
    private feedCommandRepository: FeedCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
    private cardQueryRepository: CardQueryRepository,
    private tagQueryRepository: TagQueryRepository,
  ) {}

  async invoke(command: GenerateFeedCommand) {
    await this.cardQueryRepository.findById(CardId.of(1));

    const decks = await this.deckQueryRepository.findGenerateAtUpperByNow(
      command.getLimit(),
    );
    // console.log('GenerateFeedHandler', decks);
    //
    // const card = await this.cardQueryRepository.findById(CardId.of(1));
    // if (undefined !== card) {
    //   await this.feedCommandRepository
    //     .create(card)
    //     .then((r) => console.log('add feed card 2', r))
    //     .catch(console.error);
    // }
    // const card2 = await this.cardQueryRepository.findById(CardId.of(2));
    // if (undefined !== card2) {
    //   await this.feedCommandRepository
    //     .create(card2)
    //     .then((r) => console.log('add feed card 2', r))
    //     .catch(console.error);
    // }

    decks.forEach((deck) => {
      deck.updateGenerateAt();

      // if (!deck.getIsActive() || !deck.getCardsCount()) {
      //   return;
      // }

      // this.tagQueryRepository
      //   .findActiveByDeckId(deck.getId() as DeckId)
      //   .then(console.log)
      //   .catch(console.error);

      // clear exists feed by deckId
      // this.feedCommandRepository.deleteByDeckId(deck.getId() as DeckId)

      // find new feed
      // this.cardQueryRepository.findRandomByTagId()

      // push new feed
      // this.feedCommandRepository.create(new Feed())

      // resolve
      // this.deckCommandRepository.update(deck);
    });
  }
}
