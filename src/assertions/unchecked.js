import {EventEmitter} from 'events'

/**
 * Verify element "non-checkedness" :)
 * @method unchecked
 * @param {string} selector
 * @param {string} [msg = null]
 */
class Unchecked extends EventEmitter {
  constructor (selector, msg = null) {
    super()

    this.MSG_DEFAULT = `Testing if element <${selector}> is unchecked.`

    this._message = msg || this.MSG_DEFAULT
    this._selector = selector
  }

  get message () {
    return this._message
  }

  get expected () {
    return false
  }

  command (callback) {
    const self = this

    return this.api.execute(
      // Performed in-browser.
      function (selector) {
        return document.querySelector(selector).checked
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
    return result.value
  }

  pass (value) {
    return value === this.expected
  }
}

export default {
  assertion: Unchecked,
}
