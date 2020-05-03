export const app = document.querySelector('#app')

export function show() {
  app.style.opacity = null
}

export function hide() {
  app.style.opacity = '1'
}

export function reload() {
  window.location.reload()
}
