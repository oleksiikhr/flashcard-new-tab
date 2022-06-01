import CreateDeckCommand from './CreateDeckCommand';
import Deck from '../../../Domain/Deck/Deck';
import DeckCreator from '../../../Domain/Deck/Service/DeckCreator';
import DeckName from '../../../Domain/Deck/DeckName';
import DeckSettings from '../../../Domain/Deck/DeckSettings';

export default class CreateDeckHandler {
  constructor(private creator: DeckCreator) {}

  public invoke(command: CreateDeckCommand): Promise<Deck> {
    return this.creator.create(
      new DeckName(command.getName()),
      command.getIsActive(),
      new DeckSettings(command.getSettings()),
    );
  }
}
