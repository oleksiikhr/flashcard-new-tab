'use strict'

import notification from '../../scripts/notification'
import { htmlToElement } from '../../scripts/html'
import info from '../../db/info'
import render from '../render'

export default (db) => {
  return import('./createCard.html')
    .then((html) => {
      return render('Create Card', htmlToElement(html))
    })
    .then((template) => {
      return new Promise((resolve) => {
        template.addEventListener('submit', function (evt) {
          evt.preventDefault()

          const question = document.querySelector('#card-question-input').value.trim()
          const answer = document.querySelector('#card-answer-input').value.trim()

          if (!question || !answer) {
            return
          }

          db.dexie.cards.put({
            question,
            answer,
            clicks: 0,
            views: 0,
            up: 0,
            down: 0,
            is_active: 1,
            updated_at: new Date(),
            created_at: new Date()
          })
            .then(() => db.cardsCount())
            .then((count) => info.decks.update(db.deck.id, { cards_count: count }))
            .then(() => resolve())
            .catch(notification)
        })
      })
    })
}
