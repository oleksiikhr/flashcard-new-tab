import DeckId from '../../../Domain/Deck/DeckId';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DeckCommandRepository from '../../../Domain/Deck/Repository/DeckCommandRepository';
import Deck from '../../../Domain/Deck/Deck';

export default class DeleteDeckHandler {
  constructor(
    private commandRepository: DeckCommandRepository,
    private queryRepository: DeckQueryRepository,
  ) {}

  public async invoke(id: number): Promise<Deck | undefined> {
    const deck = await this.queryRepository.findById(DeckId.of(id));

    if (undefined === deck) {
      return Promise.resolve(undefined);
    }

    await this.commandRepository.delete(deck);

    return deck;
  }
}
