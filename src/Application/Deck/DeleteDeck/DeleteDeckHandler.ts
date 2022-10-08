import DeckId from '../../../Domain/Modules/Deck/DeckId';
import DeckCommandRepository from '../../../Domain/Modules/Deck/Repository/DeckCommandRepository';
import Deck from '../../../Domain/Modules/Deck/Deck';
import DeckQueryRepository from '../../../Domain/Modules/Deck/Repository/DeckQueryRepository';

export default class DeleteDeckHandler {
  constructor(
    private deckCommandRepository: DeckCommandRepository,
    private deckQueryRepository: DeckQueryRepository,
  ) {}

  public async invoke(id: number): Promise<Deck | undefined> {
    const deck = await this.deckQueryRepository.findById(DeckId.of(id));

    if (undefined === deck) {
      return Promise.resolve(undefined);
    }

    await this.deckCommandRepository.delete(deck);

    return deck;
  }
}
