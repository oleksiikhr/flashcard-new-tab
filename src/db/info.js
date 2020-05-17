import Dexie from 'dexie'

const info = new Dexie('__info')

info.version(1).stores({
  'decks': '++id,&name,is_active'
})

export function getActiveDecks() {
  return info.decks
    .where('is_active').equals(1)
    .toArray()
}

export function getDecks() {
  return info.decks.toArray()
}

export function getDeck(id) {
  return info.decks
    .where('id').equals(id)
    .first()
}

export function createDeck(obj) {
  return info.decks.put({
    name: '',
    is_active: 1,
    cards_count: 0,
    updated_at: new Date(),
    created_at: new Date(),
    ...obj
  })
}

export function deleteDeck(deck) {
  return Dexie.delete(`deck-${deck.name}`)
    .then(() => info.decks.delete(deck.id))
}

export function toggleDeckStatus(deck) {
  const newStatus = deck.is_active ? 0 : 1

  return info.decks.update(deck.id, { is_active: newStatus })
    .then(() => deck.is_active = newStatus)
}

export default info
