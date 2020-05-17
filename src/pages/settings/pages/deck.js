'use strict'

import { htmlToElement } from '../../../scripts/html'
import cardRating from '../../../scripts/cardRating'
import { getDeck } from '../../../db/info'
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
  const table = document.querySelector('#d-table-cards')

  db.paginate(1)
    .then((cards) => {
      const row = htmlToElement(`
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
        const el = row.cloneNode(true)

        el.querySelector('.d-row-question').innerText = card.question
        el.querySelector('.d-row-answer').innerText = card.answer
        el.querySelector('.d-row-clicks').innerText = card.clicks
        el.querySelector('.d-row-views').innerText = card.views
        el.querySelector('.d-row-rating').innerText = cardRating(card.up, card.down)
        el.querySelector('.d-row-active').innerText = card.is_active ? '+' : '-'
        el.querySelector('.d-row-updated_at').innerText = card.updated_at.toLocaleString()
        el.querySelector('.d-row-created_at').innerText = card.created_at.toLocaleString()

        elements.push(el)
      })

      const toElement = table.querySelector('tbody')
      toElement.innerHTML = ''
      toElement.append(...elements)
    })
}
