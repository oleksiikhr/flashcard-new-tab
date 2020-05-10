import Dexie from 'dexie'

export default class Deck {
  constructor(deck) {
    this.deck = deck
    this.db = new Dexie(deck.name)

    this.db.version(1).stores({
      'cards': '++id,is_active'
    })
  }

  randomActiveCard() {
    if (!this.deck.cards_count) {
      return undefined
    }

    return this.db.cards
      .where('is_active').equals(1)
      .toArray()
  }
}
