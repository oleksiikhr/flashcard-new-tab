'use strict'

import db, { getDeck } from '../../../../db/info'
import Deck from '../../../../db/Deck'

export function render(to, view, attributes) {
  const id = +attributes.id

  return getDeck(id)
    .then((deck) => {
      return new Deck(deck)
    })
    .then((data) => {
      generate(id, data)
    })
}

function generate(id, data) {
  const question = document.querySelector('[name="question"]')
  const answer = document.querySelector('[name="answer"]')
  const button = document.querySelector('button')

  console.log(data)
  button.addEventListener('click', () => {
    data.db.cards.put({
      question: question.value,
      answer: answer.value,
      clicks: 0,
      views: 0,
      up: 0,
      down: 0,
      is_active: 1,
      updated_at: new Date(),
      created_at: new Date()
    })
      .then(() => {
        return data.db.cards.count()
      })
      .then((count) => {
        db.decks.update(id, { cards_count: count })
      })
  })
}
