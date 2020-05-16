'use strict'

export default (to) => {
  switch (to) {
    case 'welcome':
      return {
        file: import('../pages/other/welcome.js'),
        html: import('../pages/other/welcome.html'),
      }
    case 'settings':
      return {
        file: import('../pages/settings/index.js'),
        html: import('../pages/settings/index.html')
      }
    case 'deck':
      return {
        file: import('../pages/settings/pages/deck.js'),
        html: import('../pages/settings/pages/deck.html')
      }
    case 'no-cards':
      return {
        file: import('../pages/other/no-cards.js'),
        html: import('../pages/other/no-cards.html'),
      }
    case 'error':
      return {
        file: import('../pages/other/error.js'),
        html: import('../pages/other/error.html')
      }
    default:
      return null
  }
}
