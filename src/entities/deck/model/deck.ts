import { createIdentifier } from '../../../shared/util/identifier';

export type Deck = {
  id: string;
  name: string;
  isActive: boolean;
  metadata: DeckMetadata;
  settings: DeckSettings;
  generateAt: Date;
  updatedAt: Date;
  createdAt: Date;
};

export type DeckMetadata = {
  cardsCount: number;
  activeCardsCount: number;
  tagsCount: number;
};

export type DeckSettings = {
  recalculate: {
    count: number;
    hours: number;
    algorithm: 'random';
  };
};

export type DeckSerialized = {
  id: string;
  name: string;
  is_active: number;
  metadata: DeckMetadata;
  settings: DeckSettings;
  generate_at: Date;
  updated_at: Date;
  created_at: Date;
};

export const serializeDeck = (deck: Deck): DeckSerialized => ({
  id: deck.id,
  name: deck.name,
  is_active: +deck.isActive,
  metadata: deck.metadata,
  settings: deck.settings,
  generate_at: deck.generateAt,
  updated_at: deck.updatedAt,
  created_at: deck.createdAt,
});

export const unserializeDeck = (raw: DeckSerialized): Deck => ({
  id: raw.id,
  name: raw.name,
  isActive: !!raw.is_active,
  metadata: raw.metadata,
  settings: raw.settings,
  generateAt: raw.generate_at,
  updatedAt: raw.updated_at,
  createdAt: raw.created_at,
});

export const createDeckModel = (
  name: string,
  isActive: boolean,
  settings: DeckSettings,
): Deck => ({
  id: createIdentifier(),
  name,
  isActive,
  metadata: {
    cardsCount: 0,
    activeCardsCount: 0,
    tagsCount: 0,
  },
  settings,
  generateAt: new Date(),
  updatedAt: new Date(),
  createdAt: new Date(),
});

export const updateDeckModel = (deck: Deck, fields: Partial<Deck>): void => {
  deck.name = fields.name ?? deck.name;
  deck.isActive = fields.isActive ?? deck.isActive;
  deck.settings = fields.settings ?? deck.settings;
  deck.updatedAt = new Date();
};

export const nextGenerateDeck = (deck: Deck): void => {
  const date = new Date();
  date.setHours(date.getHours() + deck.settings.recalculate.hours);

  deck.generateAt = date;
};
