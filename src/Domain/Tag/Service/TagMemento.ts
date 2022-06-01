import Tag from '../Tag';
import TagId from '../TagId';
import TagName from '../TagName';
import DeckId from '../../Deck/DeckId';
import DeckQueryRepository from '../../Deck/Repository/DeckQueryRepository';

export type TagRaw = {
  id: number | undefined;
  deck_id: number | undefined;
  name: string;
  cards_count: number;
  is_active: number;
  updated_at: Date;
  created_at: Date;
};

export default class TagMemento {
  constructor(private deckQueryRepository: DeckQueryRepository) {}

  public serialize(tag: Tag): TagRaw {
    return {
      id: tag.getId()?.getIdentifier(),
      deck_id: tag.getDeck()?.getId()?.getIdentifier(),
      name: tag.getName().getValue(),
      cards_count: tag.getCardsCount(),
      is_active: +tag.getIsActive(),
      updated_at: tag.getUpdatedAt(),
      created_at: tag.getCreatedAt(),
    };
  }

  public async unserialize(raw: TagRaw): Promise<Tag> {
    let deck;

    if (undefined !== raw.deck_id) {
      deck = await this.deckQueryRepository.findById(DeckId.of(raw.deck_id));
    }

    return new Tag(
      undefined !== raw.id ? TagId.of(raw.id) : undefined,
      deck,
      new TagName(raw.name),
      raw.cards_count,
      !!raw.is_active,
      raw.updated_at,
      raw.created_at,
    );
  }
}
