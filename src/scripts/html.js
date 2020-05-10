'use strict'

/**
 * @param {string} html
 * @return {ChildNode}
 */
export function htmlToElement(html) {
  const template = document.createElement('template')
  html = html.trim()
  template.innerHTML = html
  return template.content.firstChild
}
