import './index.scss'

export function render(to, view, msg) {
  const el = document.querySelector('#s-message')

  if (msg instanceof Error) {
    console.error(msg)
    msg = msg.message
  }

  el.innerText = msg || 'Something went wrong'
}
