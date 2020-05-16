'use strict'

import notification from '../../../scripts/notification'
import { htmlToElement } from '../../../scripts/html'
import { getDeck } from '../../../db/info'
import info from '../../../db/info'
import DB from '../../../db/DB'

export function render(to, view, attributes) {
  const id = +attributes.id

  return getDeck(id)
    .then((deck) => {
      return new DB(deck)
    })
    .then((db) => {
      generate(db)
    })
}

function generate(db) {
  const question = document.querySelector('[name="question"]')
  const answer = document.querySelector('[name="answer"]')
  const button = document.querySelector('button')
  const table = document.querySelector('#d-table-cards')

  db.paginate(1)
    .then((cards) => {
      const template = htmlToElement(`
        <tr class="d-table-row">
          <td class="d-row-question"></td>
          <td class="d-row-answer"></td>
          <td class="d-row-clicks"></td>
          <td class="d-row-views"></td>
          <td class="d-row-rating"></td>
          <td class="d-row-active"></td>
          <td class="d-row-updated_at"></td>
          <td class="d-row-created_at"></td>
        </tr>
      `)

      const elements = []

      cards.forEach((card) => {
        const el = template.cloneNode(true)

        el.querySelector('.d-row-question').innerText = card.question
        el.querySelector('.d-row-answer').innerText = card.answer
        el.querySelector('.d-row-clicks').innerText = card.clicks
        el.querySelector('.d-row-views').innerText = card.views
        el.querySelector('.d-row-rating').innerText = card.up / card.down
        el.querySelector('.d-row-active').innerText = card.is_active
        el.querySelector('.d-row-updated_at').innerText = card.updated_at
        el.querySelector('.d-row-created_at').innerText = card.created_at

        elements.push(el)
      })

      const toElement = table.querySelector('tbody')
      toElement.innerHTML = ''
      toElement.append(...elements)
    })

  button.addEventListener('click', () => {
    db.dexie.cards.put({
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
        // This is to make it easier to track the right
        // amount than +1
        return db.cardsCount()
      })
      .then((count) => {
        info.decks.update(db.deck.id, { cards_count: count })
      })
      .catch(notification)
  })
}
