'use strict'

import { deleteCard as deleteCardConfirm } from '../confirm'
import notification from '../../scripts/notification'
import { htmlToElement } from '../../scripts/html'
import render from '../render'

export default (db, card) => {
  return import('./editCard.html')
    .then((html) => {
      return render('Edit Card', htmlToElement(html))
    })
    .then(({ template, exit }) => {
      return new Promise((resolve) => {
        const questionElement = document.querySelector('#card-question-input')
        const answerElement = document.querySelector('#card-answer-input')
        const actionDeleteElement = document.querySelector('#card-delete')
        const actionStatusElement = document.querySelector('#card-status')

        let isActive = card.is_active

        actionStatusElement.addEventListener('click', function () {
          isActive = !isActive
          this.innerText = isActive ? 'Active' : 'Disable'
        })

        actionDeleteElement.addEventListener('click', () => {
          if (deleteCardConfirm()) {
            db.deleteCard(card.id)
              .then(() => {
                notification(`Card #${card.id} deleted`)
                resolve({ type: 'delete', card, exit })
              })
              .catch(notification)
          }
        })

        questionElement.value = card.question
        answerElement.value = card.answer
        actionStatusElement.innerText = isActive ? 'Active' : 'Disable'

        template.addEventListener('submit', function (evt) {
          evt.preventDefault()

          const question = questionElement.value.trim()
          const answer = answerElement.value.trim()

          if (!question || !answer) {
            return
          }

          db.updateCard(card, { question, answer, is_active: isActive ? 1 : 0 })
            .then(() => {
              notification('Card updated!')
              resolve({ type: 'update', card, exit })
            })
            .catch(notification)
        })
      })
    })
}
