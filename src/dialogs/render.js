'use strict'

import { htmlToElement } from '../scripts/html'

function render(template) {
  document.body.appendChild(template)

  const exit = () => {
    document.removeEventListener('keydown', handleWindow)
    document.body.removeChild(template)
  }

  document.querySelector('.dialog')
    .addEventListener('click', () => {
      exit()
    })

  document.querySelector('.dialog-wrap')
    .addEventListener('click', (evt) => {
      evt.stopPropagation()
    })

  document.querySelector('.dialog-close')
    .addEventListener('click', () => {
      exit()
    })

  document.addEventListener('keydown', handleWindow)

  function handleWindow(evt) {
    if (evt.key === 'Escape') {
      exit()
    }
  }

  return template
}

export default (header, content) => {
  return import('./template.html')
    .then((html) => {
      const template = htmlToElement(html)

      const headerEl = template.querySelector('.dialog-header')
      const contentEl = template.querySelector('.dialog-content')

      if (header instanceof Element) {
        headerEl.appendChild(header)
      } else {
        headerEl.innerText = header
      }

      if (content instanceof Element) {
        contentEl.appendChild(content)
      } else {
        contentEl.innerText = content
      }

      return render(template)
    })
}