'use strict'

import { deleteDeck as deleteDeckConfirm } from '../../../dialogs/confirm'
import createCard from '../../../dialogs/blocks/createCard'
import notification from '../../../scripts/notification'
import { htmlToElement } from '../../../scripts/html'
import cardRating from '../../../scripts/cardRating'
import { deleteDeck } from '../../../db/info'
import { getDeck } from '../../../db/info'
import DB from '../../../db/DB'
import './deck.scss'

export function render(to, view, attributes) {
  const id = +attributes.id

  return getDeck(id)
    .then((deck) => {
      const db = new DB(deck)

      generate(db)
    })
}

function generate(db) {
  const tbodyElement = document.querySelector('#d-table-cards tbody')
  const pageElement = document.querySelector('.pagination__page')
  let currentPage = 1

  const generateRows = (page) => {
    return db.paginate(page, 2)
      .then((cards) => {
        if (!cards.length) {
          return
        }

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
          el.querySelector('.d-row-active').innerText = card.is_active ? 'Yes' : 'No'
          el.querySelector('.d-row-updated_at').innerText = toDate(card.updated_at)
          el.querySelector('.d-row-created_at').innerText = toDate(card.created_at)

          elements.push(el)
        })

        tbodyElement.innerHTML = ''
        tbodyElement.append(...elements)

        currentPage = page
        pageElement.innerText = page
      })
  }

  document.querySelector('#deck-title').innerText = db.deck.name

  document.querySelector('#deck-action-delete')
    .addEventListener('click', () => {
      if (deleteDeckConfirm()) {
        deleteDeck(db.deck)
          .then(() => {
            notification(`Deck "${db.deck.name}" deleted`)
            location.reload()
          })
          .catch(notification)
      }
    })

  document.querySelector('#card-action-create')
    .addEventListener('click', () => {
      createCard(db).then(({ exit }) => {
        generateRows(1)
        exit()
      })
    })

  document.querySelector('.pagination__right')
    .addEventListener('click', () => {
      generateRows(currentPage + 1)
    })

  document.querySelector('.pagination__left')
    .addEventListener('click', () => {
      if (currentPage > 1) {
        generateRows(currentPage - 1)
      }
    })

  generateRows(1)
}

const startOfDay = new Date()
startOfDay.setHours(0, 0, 0)

const endOfDay = new Date(startOfDay)
endOfDay.setDate(endOfDay.getDate() + 1)

/**
 * @param {Date} date
 * @return {string}
 */
function toDate(date) {
  if (date > startOfDay && date < endOfDay) {
    return `${date.toLocaleTimeString()}`
  }

  return date.toDateString()
}
