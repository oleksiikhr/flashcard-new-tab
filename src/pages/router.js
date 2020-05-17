'use strict'

import pages from '../state/pages'

export function registerRouteLink(selector = '[to]') {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener('click', routeClickHandle)
  })
}

export function routeClickHandle() {
  routeRenderElement(this)
}

export function routeRender(to, view, attributes) {
  const toElement = document.querySelector(`[view="${view}"]`)
  if (!toElement) {
    throw new Error(`Route View [${view}] not found`)
  }

  const page = pages(to)
  if (!page) {
    throw new Error(`Route Page [${to}] not found`)
  }

  return Promise.all([page.file, page.html])
    .then(([file, html]) => {
      toElement.innerHTML = html

      return file.render(view, to, attributes)
    })
    .catch((err) => {
      return routeRender('error', 'root', err)
    })
}

export function routeRenderElement(el) {
  const view = el.getAttribute('to.view')
  const to = el.getAttribute('to')

  return routeRender(to, view, routeAttributes(el))
}

function routeAttributes(el) {
  const attributes = {}

  el.getAttributeNames().forEach((attr) => {
    if (attr.indexOf('to.') === 0) {
      attributes[attr.substr(3)] = el.getAttribute(attr)
    }
  })

  return attributes
}
