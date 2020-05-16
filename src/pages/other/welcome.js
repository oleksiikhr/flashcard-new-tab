import createDeck from '../../dialogs/blocks/createDeck'
import { routeRender } from '../router'
import './index.scss'

export function render() {
  document.querySelector('#create-card')
    .addEventListener('click', () => {
      createDeck()
        .then(() => location.reload())
        .catch((e) => routeRender('error', 'root', e))
    })
}
