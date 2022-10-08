import Deck from '../Deck';
import DeckId from '../DeckId';
import DeckSettings, { DeckSettingsRaw } from '../ValueObject/DeckSettings';

export type DeckRaw = {
  id?: number | undefined;
  name: string;
  is_active: number;
  cards_count: number;
  active_cards_count: number;
  tags_count: number;
  settings: DeckSettingsRaw;
  generate_at: Date;
  updated_at: Date;
  created_at: Date;
};

export default class DeckMemento {
  public serialize(deck: Deck): DeckRaw {
    return {
      id: deck.isExists() ? deck.getId().getIdentifier() : undefined,
      name: deck.getName(),
      is_active: +deck.getIsActive(),
      cards_count: deck.getCardsCount(),
      active_cards_count: deck.getActiveCardsCount(),
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
      raw.name,
      !!raw.is_active,
      raw.cards_count,
      raw.active_cards_count,
      raw.tags_count,
      new DeckSettings(raw.settings),
      raw.generate_at,
      raw.updated_at,
      raw.created_at,
    );
  }
}