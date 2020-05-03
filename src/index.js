import Storage from './scripts/Storage'
import { show } from './pages/app'

(() => {
  if (!Storage.authForm) {
    return import('./pages/auth/index')
      .then((page) => {
        page.render()
      })
  }

  document.querySelector('#profile').addEventListener('click', () => {
    import('./pages/auth/index')
      .then((page) => {
        Storage.authForm = false
        page.render()
      })
  })

  show()
})()
