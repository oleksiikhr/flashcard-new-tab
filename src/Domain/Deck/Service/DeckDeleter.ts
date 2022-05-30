import DeckCommandRepository from '../Repository/DeckCommandRepository';
import DeckId from '../DeckId';
import DeckQueryRepository from '../Repository/DeckQueryRepository';

export default class DeckDeleter {
  constructor(
    private commandRepository: DeckCommandRepository,
    private queryRepository: DeckQueryRepository
  ) {}

  public async delete(id: DeckId): Promise<void> {
    const deck = await this.queryRepository.findById(id);

    if (undefined === deck) {
      return;
    }

    if (0 !== deck.getCardsCount()) {
      throw new Error(''); // TODO error
    }

    // TODO Delete tags

    await this.commandRepository.delete(id);
  }
}
