import Deck from '../../../Domain/Model/Deck/Deck';
import DeckName from '../../../Domain/Model/Deck/DeckName';
import DeckSettings from '../../../Domain/Model/Deck/DeckSettings';
import DeckUpdater from '../../../Domain/Model/Deck/Service/DeckUpdater';
import UpdateDeckCommand from './UpdateDeckCommand';
import DeckId from '../../../Domain/Model/Deck/DeckId';

export default class UpdateDeckHandler {
  constructor(private updater: DeckUpdater) {}

  public invoke(command: UpdateDeckCommand): Promise<Deck> {
    return this.updater.update(
      DeckId.of(command.getId()),
      new DeckName(command.getName()),
      command.getIsActive(),
      new DeckSettings(command.getSettings())
    );
  }
}
