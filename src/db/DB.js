import Dexie from 'dexie'
import { rnd } from '../scripts/helpers'
import info from './info'

export default class DB {
  constructor(deck) {
    this.deck = deck
    this.dexie = new Dexie(`deck-${this.deck.name}`)

    this.dexie.version(1).stores({
      'cards': '++id,is_active'
    })
  }

  cardsCount() {
    return this.dexie.cards.count()
  }

  createCard(obj) {
    return this.dexie.cards.put({
      question: '',
      answer: '',
      clicks: 0,
      views: 0,
      up: 0,
      down: 0,
      is_active: 1,
      updated_at: new Date(),
      created_at: new Date(),
      ...obj
    })
      .then(() => this.cardsCount())
      .then((count) => info.decks.update(this.deck.id, { cards_count: count }))
  }

  updateCard(card, obj) {
    const changes = {
      updated_at: new Date(),
      ...obj
    }

    return this.dexie.cards.update(card.id, changes)
      .then(() => this.cardsCount())
      .then((count) => info.decks.update(this.deck.id, { cards_count: count }))
      .then(() => {
        Object.entries(changes).forEach(([key, val]) => card[key] = val)

        return card
      })
  }

  deleteCard(cardId) {
    return this.dexie.cards.delete(cardId)
      .then(() => this.cardsCount())
      .then((count) => info.decks.update(this.deck.id, { cards_count: count }))
  }

  paginate(page = 1, itemsPerPage = 50) {
    return this.dexie.cards
      .offset((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .toArray()
  }

  randomActiveCard() {
    if (!this.deck.cards_count) {
      return undefined
    }

    return this.dexie.cards
      .where('is_active').equals(1)
      .offset(rnd(0, this.deck.cards_count - 1))
      .limit(1)
      .first()
  }

  incrementViews(cardId, count) {
    return this.dexie.cards
      .update(cardId, { views: count + 1 })
      .then(() => count + 1)
  }

  incrementClicks(cardId, count) {
    return this.dexie.cards
      .update(cardId, { clicks: count + 1 })
      .then(() => count + 1)
  }

  incrementRatingUp(cardId, count) {
    return this.dexie.cards
      .update(cardId, { up: count + 1 })
      .then(() => count + 1)
  }

  incrementRatingDown(cardId, count) {
    return this.dexie.cards
      .update(cardId, { down: count + 1 })
      .then(() => count + 1)
  }
}
