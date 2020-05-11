import Dexie from 'dexie'
import { rnd } from '../scripts/helpers'

export default class Deck {
  constructor(deck) {
    this.deck = deck
    this.db = new Dexie(deck.name)

    this.db.version(1).stores({
      'cards': '++id,is_active'
    })
  }

  paginate(page = 1, itemsPerPage = 50) {
    return this.db.cards
      .offset((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .toArray()
  }

  randomActiveCard() {
    if (!this.deck.cards_count) {
      return undefined
    }

    return this.db.cards
      .where('is_active').equals(1)
      .offset(rnd(0, this.deck.cards_count - 1))
      .limit(1)
      .first()
  }
}
