'use strict'

import notification from '../../scripts/notification'
import { htmlToElement } from '../../scripts/html'
import render from '../render'

export default (db) => {
  return import('./createCard.html')
    .then((html) => {
      return render('Create Card', htmlToElement(html))
    })
    .then(({ template, exit }) => {
      return new Promise((resolve) => {
        const questionElement = document.querySelector('#card-question-input')
        const answerElement = document.querySelector('#card-answer-input')

        template.addEventListener('submit', function (evt) {
          evt.preventDefault()

          const question = questionElement.value.trim()
          const answer = answerElement.value.trim()

          if (!question || !answer) {
            return
          }

          db.createCard({ question, answer })
            .then(() => {
              notification('Card created!')
              resolve({ exit })
            })
            .catch(notification)
        })
      })
    })
}
