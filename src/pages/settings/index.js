'use strict'

import { registerRouteLink, routeClickHandle, routeRender } from '../router'
import createDeck from '../../dialogs/blocks/createDeck'
import notification from '../../scripts/notification'
import { htmlToElement } from '../../scripts/html'
import { toggleDeckStatus } from '../../db/info'
import { getDecks } from '../../db/info'
import './index.scss'

export function updateAsideDecks() {
  return getDecks()
    .then((decks) => {
      const template = htmlToElement(`
        <div class="deck">
          <div class="deck-name" to="deck" to.view="settings"></div>
          <div class="deck-status"></div>
        </div>
      `)

      const elements = []

      decks.forEach((deck) => {
        const el = template.cloneNode(true)
        const elName = el.querySelector('.deck-name')
        const elStatus = el.querySelector('.deck-status')

        elName.setAttribute('title', deck.name)
        elName.setAttribute('to.id', deck.id)
        elName.innerText = deck.name

        const updateStatus = () => {
          elStatus.innerText = deck.is_active ? 'A' : 'D'
          elStatus.title = deck.is_active ? 'Active' : 'Disable'
          elStatus.classList.add(deck.is_active ? 'active' : 'disable')
        }

        updateStatus()

        elName.addEventListener('click', routeClickHandle)
        elStatus.addEventListener('click', () => {
          toggleDeckStatus(deck)
            .then(() => {
              notification('Status Changed!')
              updateStatus()
            })
            .catch(notification)
        })

        elements.push(el)
      })

      const toElement = document.querySelector('[render="decks"]')
      toElement.innerHTML = ''
      toElement.append(...elements)

      return decks
  })
}

export function render(to, view, attributes) {
  updateAsideDecks()
  registerRouteLink()

  document.querySelector('#actionGoTop')
    .addEventListener('click', () => location.reload())

  document.querySelector('#action-deck-create')
    .addEventListener('click', () => createDeck())

  if (attributes.page === 'deck' && attributes.id) {
    return routeRender('deck', 'settings', { id: +attributes.id })
  }
}
