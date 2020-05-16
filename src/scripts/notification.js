'use strict'

const wrap = document.querySelector('#notifications')

export default (message) => {
  const el = document.createElement('div')
  el.classList.add('notification')
  el.innerText = message

  wrap.appendChild(el)

  setTimeout(() => el.classList.add('visible'))

  setTimeout(() => {
    el.classList.remove('visible')
    setTimeout(() => wrap.removeChild(el), 200)
  }, 2500)
}
