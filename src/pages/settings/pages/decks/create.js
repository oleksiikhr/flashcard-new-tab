'use strict'

import { updateAsideDecks } from '../../index'
import { routeRender } from '../../../router'
import db from '../../../../db/info'

export function render() {
  const el = document.querySelector('#deck-create-form')

  el.addEventListener('submit', (evt) => {
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
      .then((id) => {
        updateAsideDecks()

        routeRender('deck-view', 'settings', { id })
      })
  })
}
