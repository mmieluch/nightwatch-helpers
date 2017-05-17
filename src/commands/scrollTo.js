import { EventEmitter } from 'events'
import getSelector from '../utils/get-selector'

/**
 * @class scrollTo
 * @extends EventEmitter
 * @module @mmieluch/nightwatch-helpers/commands
 */
export default class scrollTo extends EventEmitter {
  /**
   * @param {string} [selector = null]
   * @returns {scrollTo}
   */
  command (selector = null) {
    // No selector === no work. Like me, but with coffee.
    if (selector === null) return this.complete()
    // Prepare to tell the world the job is done.
    const emitComplete = this.emit.bind(this, 'complete')
    // Transform the selector, in case the "@" sign is too baffling for Nightwatch.
    const sel = getSelector(selector)

    // Establish the location of the element.
    this.getLocation(sel)
      // Set window position to the found coordinates.
      .then(coordinates => this.scrollTo(coordinates.y))
      .then(emitComplete)
      .catch(err => {
        console.error(err)
        emitComplete()
      })

    return this
  }

  /**
   * Promisify `setWindowPosition` to avoid callback hell.
   * @param {number} [y = 0]
   * @returns {Promise}
   */
  scrollTo (y = 0) {
    if (y === 0) console.warn('The value for the `y` coordinate was passed in as 0.')

    const self = this

    return new Promise(function (resolve, reject) {
      self.api.execute(function (y) {
        window.scroll(0, y)
      }, [y], function (result) {
        resolve(true)
      })
    })
  }

  /**
   * Promisify `getLocation` function to avoid callback hell.
   * @param selector
   * @returns {Promise}
   */
  getLocation (selector) {
    const self = this

    return new Promise(function (resolve, reject) {
      self.api.getLocation(selector, function (result) {
        if (result.status !== 0) reject(result)

        resolve({
          x: result.value.x,
          y: result.value.y,
        })
      })
    })
  }

  /**
   * Emit a "complete" event and return the command instance.
   * @fires EventEmitter#complete
   * @returns {scrollTo}
   */
  complete () {
    this.emit('complete')
    return this
  }
}
