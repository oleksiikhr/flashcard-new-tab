import DeckId from '../../../Domain/Deck/DeckId';
import DeleteDeckCommand from './DeleteDeckCommand';
import DeckDeleter from '../../../Domain/Deck/Service/DeckDeleter';

export default class DeleteDeckHandler {
  constructor(private deleter: DeckDeleter) {}

  public invoke(command: DeleteDeckCommand): Promise<void> {
    return this.deleter.delete(DeckId.of(command.getId()));
  }
}
