'use strict'

export default (to) => {
  switch (to) {
    case 'welcome':
      return {
        file: import('../pages/other/welcome'),
        html: import('../pages/other/welcome.html'),
      }
    case 'settings':
      return {
        file: import('../pages/settings/index'),
        html: import('../pages/settings/index.html')
      }
    case 'deck-create':
      return {
        file: import('../pages/settings/pages/decks/create'),
        html: import('../pages/settings/pages/decks/create.html')
      }
    case 'deck-view':
      return {
        file: import('../pages/settings/pages/decks/view'),
        html: import('../pages/settings/pages/decks/view.html')
      }
    case 'no-cards':
      return {
        file: import('../pages/other/no-cards'),
        html: import('../pages/other/no-cards.html'),
      }
    case 'error':
      return {
        file: import('../pages/other/error'),
        html: import('../pages/other/error.html')
      }
    default:
      return null
  }
}
