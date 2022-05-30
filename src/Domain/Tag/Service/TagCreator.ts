import TagCommandRepository from '../Repository/TagCommandRepository';
import TagName from '../TagName';
import Tag from '../Tag';
import Deck from '../../Deck/Deck';

export default class TagCreator {
  constructor(private commandRepository: TagCommandRepository) {}

  public async create(
    deck: Deck,
    name: TagName,
    isActive: boolean
  ): Promise<Tag> {
    const tag = Tag.create(deck, name, isActive);

    await this.commandRepository.create(tag);

    return tag;
  }
}
