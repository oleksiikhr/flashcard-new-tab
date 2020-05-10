import './index.scss'

export function render(to, view, attributes) {
  document.querySelector('#s-message').innerText = attributes.message || 'Something went wrong'
}
