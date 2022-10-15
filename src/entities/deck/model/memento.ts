import Deck, { DeckSettingsRaw } from './Deck';

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

export const serializeDeck = (deck: Deck): DeckRaw => ({
  id: deck.isExists() ? deck.getId() : undefined,
  name: deck.getName(),
  is_active: +deck.getIsActive(),
  cards_count: deck.getCardsCount(),
  active_cards_count: deck.getActiveCardsCount(),
  tags_count: deck.getTagsCount(),
  settings: deck.getSettings(),
  generate_at: deck.getGeneratedAt(),
  updated_at: deck.getUpdatedAt(),
  created_at: deck.getCreatedAt(),
});

export const unserializeDeck = (raw: DeckRaw): Deck =>
  new Deck(
    raw.id,
    raw.name,
    !!raw.is_active,
    raw.cards_count,
    raw.active_cards_count,
    raw.tags_count,
    raw.settings,
    raw.generate_at,
    raw.updated_at,
    raw.created_at,
  );
