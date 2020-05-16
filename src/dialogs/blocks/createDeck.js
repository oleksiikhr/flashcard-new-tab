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
    .then(({ template, exit }) => {
      return new Promise((resolve) => {
        const nameElement = document.querySelector('#deck-name-input')

        template.addEventListener('submit', function (evt) {
          evt.preventDefault()

          const name = nameElement.value.trim()

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
            .then(() => {
              notification('Deck created!')
              resolve({ exit })
            })
            .catch(notification)
        })
      })
    })
}
