import {EventEmitter} from 'events'

/**
 * Verify element "checkedness" :)
 * @method checked
 * @param {string} selector
 * @param {string} [msg = null]
 */
class Checked extends EventEmitter {
  constructor (selector, msg = null) {
    super()

    this.MSG_DEFAULT = `Testing if element <${selector}> is checked.`

    this._message = msg || this.MSG_DEFAULT
    this._selector = selector
  }

  get message () {
    return this._message
  }

  get expected () {
    return true
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
  assertion: Checked,
}
