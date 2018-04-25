import isEmpty from 'lodash/isEmpty'
import BaseCommand from '../BaseCommand'

/**
 * @class GetBoundingClientRect
 * @extends BaseCommand
 * @module @mmieluch/nightwatch-helpers/commands
 */
export default class GetBoundingClientRect extends BaseCommand {
  /**
   * Execute the command.
   * @param {string} selector
   * @param callback
   * @return {GetBoundingClientRect}
   */
  command (selector, callback) {
    if (!isEmpty(selector)) {
      const fn = selector => document.querySelector(selector).getBoundingClientRect()
      const data = [selector]
      const cb = result => {
        if (typeof callback === 'function') {
          callback(result)
        }

        return this.complete()
      }

      this.api.execute(fn, data, cb)
    }

    return this.complete()
  }
}
