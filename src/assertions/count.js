import {EventEmitter} from 'events'

/**
 * @method count
 * @param {string} selector
 * @param {number} expected
 * @param {string} [msg = null]
 */
class Count extends EventEmitter {
  constructor (selector, expected, msg = null) {
    super()

    this.MSG_DEFAULT = `Testing if there is exactly ${expected} instances of element <${selector}>.`
    this.MSG_ELEMENT_NOT_FOUND = `${this.MSG_DEFAULT} Element could not be located.`

    this._message = msg || this.MSG_DEFAULT
    this._selector = selector
    this._expected = expected
  }

  get message () {
    return this._message
  }

  get expected () {
    return this._expected
  }

  command (callback) {
    const self = this

    return this.api.execute(
      // Performed in-browser.
      function (selector) {
        return document.querySelectorAll(selector).length
      },
      // Array of arguments.
      [this._selector],
      // Callback
      function (result) {
        callback.call(self, result)
      }
    )
  }

  value (result) {
    return (result.status !== 0) ? null : result.value
  }

  pass (value) {
    return value === this.expected
  }
}

export default {
  assertion: Count,
}
