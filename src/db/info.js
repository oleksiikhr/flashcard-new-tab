import Dexie from 'dexie'

const info = new Dexie('__info')

info.version(1).stores({
  'decks': '++id,is_active'
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

export default info
