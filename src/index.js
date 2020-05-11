'use strict'

import { registerRouteLink, routeRender } from './pages/router'
import calcFontSize from './scripts/calcFontSize'
import { getActiveDecks } from './db/info'
import { rnd } from './scripts/helpers'
import Deck from './db/Deck'

// Elements
const actionEdit = document.querySelector('#h-action-edit')
const actionDelete = document.querySelector('#h-action-delete')
const cardViews = document.querySelector('#h-card-views')
const cardClicks = document.querySelector('#h-card-clicks')
const cardRating = document.querySelector('#h-card-rating')
const question = document.querySelector('#h-question')
const answer = document.querySelector('#h-answer')
const actionCreate = document.querySelector('#h-action-create')
const deckName = document.querySelector('#h-deck-name')
const actionCard = document.querySelector('#h-action-card')

let deck

const generate = (card) => {
  // Content
  question.innerText = card.question
  answer.innerText = card.answer
  question.style.fontSize = `${calcFontSize(question.textContent)}px`
  answer.style.fontSize = `${Math.round(calcFontSize(answer.textContent) / 1.4)}px`

  question.addEventListener('click', () => {
    actionCard.classList.add('clicked')
  })

  // Statistics
  cardViews.innerText = card.views
  cardClicks.innerText = card.clicks
  cardRating.innerText = (card.up / card.down) || 0
}

getActiveDecks()
  .then((decks) => {
    if (!decks.length) {
      throw 'welcome'
    }

    const deckObj = decks[rnd(0, decks.length - 1)]

    deckName.innerText = deckObj.name
    deckName.setAttribute('to.id', deckObj.id)

    deck = new Deck(deckObj).randomActiveCard()

    return deck
  })
  .then((card) => {
    if (!card) {
      throw 'no-cards'
    }

    generate(card)
  })
  .catch((e) => {
    console.error(e)

    switch (e) {
      case 'welcome':
      case 'no-cards':
        return routeRender(e, 'root')
      default:
        return routeRender('error', 'root', { message: e.message })
    }
  })
  .finally(() => {
    registerRouteLink()
    document.body.style.opacity = null
  })
