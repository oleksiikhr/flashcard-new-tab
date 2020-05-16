import './index.scss'
import createCard from '../../dialogs/blocks/createCard'

export function render(to, view, attributes) {
  document.querySelector('.s-title').innerText = attributes.db.deck.name

  document.querySelector('#create-card')
    .addEventListener('click', () => {
      createCard(attributes.db)
        .then(() => location.reload())
    })
}
