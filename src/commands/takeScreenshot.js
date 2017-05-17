import {isEmpty} from 'lodash'
import utils from '../utils/index'
import {EventEmitter} from 'events'

/**
 * Take a screenshot and save it in a location specified in the config.
 * Use test module name and current test step as subdirectories.
 * For instance, if the current test file is named "todos.js" and current step
 * is named "Check if user can add an item", given the Nightwatch config has the
 * screenshots path set to /tmp, the final full path will be like this:
 * /tmp/todos/check-if-user-can-add-an-item/${prefix}-${timestamp}.png
 *
 * Does not do anything if "screenshots" option is set to `false` in the config.
 *
 * @param {String} [prefix = ''] File name prefix
 * @returns {vouchersCommands}
 */
export default class TakeScreenshot extends EventEmitter {
  command (prefix = '') {
    if (!this.api.options.screenshots) {
      this.emit('complete')
      return this
    }

    const location = this.api.options.screenshotsPath
    const moduleName = utils.getModuleName.bind(this)()
    const stepName = utils.getStepName.bind(this)()
    const timestamp = (new Date()).getTime()
    const filename = isEmpty(prefix)
      ? `${timestamp}.png`
      : `${prefix}-${timestamp}.png`
    const path = `${location}/${moduleName}/${stepName}/${filename}`
    const self = this

    this.api.saveScreenshot(path, function () {
      self.emit('complete')
    })

    return this
  }
}
