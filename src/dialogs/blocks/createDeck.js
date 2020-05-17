'use strict'

import notification from '../../scripts/notification'
import { htmlToElement } from '../../scripts/html'
import { createDeck } from '../../db/info'
import render from '../render'

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

          createDeck({ name })
            .then(() => {
              notification('Deck created!')
              resolve({ exit })
            })
            .catch(notification)
        })
      })
    })
}
