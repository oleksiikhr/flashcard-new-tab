import Dexie from 'dexie'

const info = new Dexie('__info')

info.version(1).stores({
  'decks': '++id,is_active'
})

export function getActiveDecks() {
  console.time('[DB.info] getActiveDecks')

  return info.decks
    .where('is_active').equals(1)
    .toArray()
    .finally(() => {
      console.timeEnd('[DB.info] getActiveDecks')
    })
}

export function getDecks() {
  console.time('[DB.info] getDecks')

  return info.decks.toArray()
    .finally(() => {
      console.timeEnd('[DB.info] getDecks')
    })
}

export function getDeck(id) {
  console.time(`[DB.info] getDeck ${id}`)

  return info.decks
    .where('id').equals(id)
    .first()
    .finally(() => {
      console.timeEnd(`[DB.info] getDeck ${id}`)
    })
}

export default info
