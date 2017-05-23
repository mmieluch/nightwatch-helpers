import {EventEmitter} from 'events'

/**
 * See if element is enabled.
 * @method enabled
 * @param {string} selector
 * @param {string} [msg = null]
 */
class Enabled extends EventEmitter {
  constructor (selector, msg = null) {
    super()

    this.MSG_DEFAULT = `Testing if element <${selector}> is enabled.`

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
    return this.api.element(this.client.locateStrategy, this._selector, function (result) {
      return this.elementIdEnabled(result.value.ELEMENT, callback)
    })
  }

  value (result) {
    return result.value
  }

  pass (value) {
    return value === this.expected
  }
}

export default {
  assertion: Enabled,
}
