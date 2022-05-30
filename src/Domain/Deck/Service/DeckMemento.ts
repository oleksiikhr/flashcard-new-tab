import Deck from '../Deck';
import DeckId from '../DeckId';
import DeckName from '../DeckName';
import DeckSettings from '../DeckSettings';

export type DeckRaw = {
  id: number | undefined;
  name: string;
  is_active: number;
  cards_count: number;
  tags_count: number;
  settings: object;
  generate_at: Date;
  updated_at: Date;
  created_at: Date;
};

export default class DeckMemento {
  public serialize(deck: Deck): DeckRaw {
    return {
      id: deck.getId()?.getIdentifier(),
      name: deck.getName().getValue(),
      is_active: +deck.getIsActive(),
      cards_count: deck.getCardsCount(),
      tags_count: deck.getTagsCount(),
      settings: deck.getSettings().serialize(),
      generate_at: deck.getGeneratedAt(),
      updated_at: deck.getUpdatedAt(),
      created_at: deck.getCreatedAt(),
    };
  }

  public unserialize(raw: DeckRaw): Deck {
    return new Deck(
      undefined !== raw.id ? DeckId.of(raw.id) : undefined,
      new DeckName(raw.name),
      !!raw.is_active,
      raw.cards_count,
      raw.tags_count,
      new DeckSettings(raw.settings),
      raw.generate_at,
      raw.updated_at,
      raw.created_at
    );
  }
}
