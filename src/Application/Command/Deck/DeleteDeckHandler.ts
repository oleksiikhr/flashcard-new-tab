import DeckId from '../../../Domain/Deck/DeckId';
import DeckQueryRepository from '../../../Domain/Deck/Repository/DeckQueryRepository';
import DeckCommandRepository from '../../../Domain/Deck/Repository/DeckCommandRepository';

export default class DeleteDeckHandler {
  constructor(
    private commandRepository: DeckCommandRepository,
    private queryRepository: DeckQueryRepository,
  ) {}

  public async invoke(id: number): Promise<void> {
    const deck = await this.queryRepository.findById(DeckId.of(id));

    if (undefined === deck) {
      return Promise.resolve();
    }

    return this.commandRepository.delete(deck);
  }
}
