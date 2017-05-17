import { EventEmitter } from 'events'

/**
 * @class scrollTo
 * @extends EventEmitter
 * @module @mmieluch/nightwatch-helpers/commands
 */
export default class scrollTo extends EventEmitter {
  /**
   * @returns {scrollTo}
   */
  command () {
    console.log('scrolling to the bastard!')
    return this.complete()
  }

  /**
   * Emit a "complete" event and return the command instance.
   * @fires EventEmitter#complete
   */
  complete () {
    this.emit('complete')
    return this
  }
}
