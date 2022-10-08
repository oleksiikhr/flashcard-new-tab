import DeckId from '../../Deck/DeckId';
import BusinessRule from '../../../Aggregate/BusinessRule';
import TagQueryRepository from '../Repository/TagQueryRepository';

export default class TagNameAndDeckIdMustBeUnique implements BusinessRule {
  constructor(
    private tagQueryRepository: TagQueryRepository,
    private deckId: DeckId,
    private name: string,
  ) {}

  public async isBroken(): Promise<boolean> {
    return (
      null ===
      (await this.tagQueryRepository.findByDeckIdAndName(
        this.deckId,
        this.name,
      ))
    );
  }

  public errorMessage(): string {
    return 'Tag name with this deck must be unique.';
  }
}
