'use strict'

import { registerRouteLink, routeClickHandle, routeRender } from '../router'
import { htmlToElement } from '../../scripts/html'
import { getDecks } from '../../db/info'
import './index.scss'

export function updateAsideDecks() {
  return getDecks()
    .then((decks) => {
      const template = htmlToElement(`
        <div class="deck" to="deck" to.view="settings">
          <div class="deck-name"></div>
        </div>
      `)

      const elements = []

      decks.forEach((deck) => {
        const el = template.cloneNode(true)

        el.setAttribute('title', deck.name)
        el.setAttribute('to.id', deck.id)
        el.querySelector('.deck-name').innerText = deck.name
        el.addEventListener('click', routeClickHandle)

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

  if (attributes.page === 'deck' && attributes.id) {
    return routeRender('deck', 'settings', { id: +attributes.id })
  }
}
