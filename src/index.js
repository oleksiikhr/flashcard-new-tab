import Storage from './scripts/Storage'

if (!Storage.authForm) {
  import('./pages/auth/index')
    .then((page) => {
      page.render()
    })
}
