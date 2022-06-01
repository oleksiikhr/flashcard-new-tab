import Deck from '../../../Domain/Deck/Deck';
import DeckName from '../../../Domain/Deck/DeckName';
import DeckSettings from '../../../Domain/Deck/DeckSettings';
import DeckUpdater from '../../../Domain/Deck/Service/DeckUpdater';
import UpdateDeckCommand from './UpdateDeckCommand';
import DeckId from '../../../Domain/Deck/DeckId';

export default class UpdateDeckHandler {
  constructor(private updater: DeckUpdater) {}

  public invoke(command: UpdateDeckCommand): Promise<Deck> {
    return this.updater.update(
      DeckId.of(command.getId()),
      new DeckName(command.getName()),
      command.getIsActive(),
      new DeckSettings(command.getSettings()),
    );
  }
}
