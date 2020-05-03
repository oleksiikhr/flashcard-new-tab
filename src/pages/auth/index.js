import Storage from '../../scripts/Storage'
import { app, show, reload } from '../app'
import './index.scss'

export function render() {
  import('./index.html')
    .then((page) => {
      app.innerHTML = page

      document.querySelector('.offline')
        .addEventListener('click', () => {
          Storage.authForm = true
          reload()
        })

      show()
    })
}
