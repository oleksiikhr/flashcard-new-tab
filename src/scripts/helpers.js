/**
 * @param {*} input
 * @return {boolean}
 */
export function isObject(input) {
  return input && typeof input === 'object' && input.constructor === Object
}

/**
 * @param {*} input
 * @return {boolean}
 */
export function isEmpty(input) {
  if (Array.isArray(input)) {
    return !input.length
  }

  if (isObject(input)) {
    return !Object.keys(input).length
  }

  return !input
}
