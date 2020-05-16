'use strict'

import notification from '../../scripts/notification'
import { htmlToElement } from '../../scripts/html'
import render from '../render'
import db from '../../db/info'

export default () => {
  return import('./createDeck.html')
    .then((html) => {
      return render('Create Deck', htmlToElement(html))
    })
    .then((template) => {
      return new Promise((resolve) => {
        template.addEventListener('submit', (evt) => {
          evt.preventDefault()

          const name = evt.target.querySelector('input').value

          if (!name) {
            return
          }

          db.decks.put({
            name,
            is_active: 1,
            cards_count: 0,
            updated_at: new Date(),
            created_at: new Date()
          })
            .then(resolve)
            .catch(notification)
        })
      })
    })
}
