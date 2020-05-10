'use strict'

import { isObject } from './helpers'

export default class Storage {
  // TODO Hot Keys, Colors, etc

  /**
   * @param {string} key
   * @return {boolean}
   */
  static getBool(key) {
    return localStorage.getItem(key) === 'true'
  }

  /**
   * @param {string} key
   * @param value
   */
  static setBool(key, value) {
    return !!localStorage.setItem(key, value)
  }

  /**
   * @param {string} key
   * @return {Array}
   */
  static getArray(key) {
    if (localStorage.getItem(key)) {
      try {
        const data = JSON.parse(localStorage.getItem(key))

        return Array.isArray(data) ? data : []
      } catch (e) {
        return []
      }
    }

    return []
  }

  /**
   * @param {string} key
   * @param value
   */
  static setArray(key, value) {
    if (!value) {
      const arr = Array.isArray(value) ? value : [value]

      localStorage.setItem(key, JSON.stringify(arr))
    } else {
      localStorage.setItem(key, JSON.stringify([]))
    }
  }

  /**
   * @param {string} key
   * @returns {string}
   */
  static getString(key) {
    return localStorage.getItem(key) || ''
  }

  /**
   * @param {string} key
   * @param value
   */
  static setString(key, value) {
    localStorage.setItem(key, value)
  }

  /**
   * @param {string} key
   * @return {object}
   */
  static getObject(key) {
    const item = localStorage.getItem(key)

    if (!item) {
      return {}
    }

    try {
      const data = JSON.parse(localStorage.getItem(key))

      return isObject(data) ? data : {}
    } catch (e) {
      return {}
    }
  }

  /**
   * @param {string} key
   * @param value
   */
  static setObject(key, value) {
    if (!value || typeof value !== 'object') {
      return
    }

    localStorage.setItem(key, JSON.stringify(value))
  }
}
