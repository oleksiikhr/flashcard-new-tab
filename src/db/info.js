import Dexie from 'dexie'

const db = new Dexie('__info')

db.version(1).stores({
  'decks': '++id,is_active'
})

export function getActiveDecks() {
  return db.decks
    .where('is_active').equals(1)
    .toArray()
}

export function getDecks() {
  return db.decks.toArray()
}

export function getDeck(id) {
  return db.decks
    .where('id').equals(id)
    .first()
}

export default db
