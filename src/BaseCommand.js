import { EventEmitter } from 'events'

/**
 * @class BaseCommand
 * @extends EventEmitter
 * @private
 */
export default class BaseCommand extends EventEmitter {
  complete () {
    this.emit('complete')
    return this
  }
}
