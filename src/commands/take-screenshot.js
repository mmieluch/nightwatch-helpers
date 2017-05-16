const kebabCase = require('lodash.kebabcase')

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
module.exports = function (prefix = '') {
  if (!this.api.options.screenshots) {
    return this
  }

  const location = this.api.options.screenshotsPath
  const moduleName = getModuleName.bind(this)()
  const stepName = getStepName.bind(this)()
  const timestamp = (new Date()).getTime()
  const filename = _.isEmpty(prefix)
      ? `${timestamp}.png`
      : `${prefix}-${timestamp}.png`
  const path = `${location}/${moduleName}/${stepName}/${filename}`

  this.api.saveScreenshot(path)

  return this
}

function getModuleName () {
  return this.client.api.currentTest.module
}

function getStepName () {
  return kebabCase(this.client.api.currentTest.name)
}

function getSelector (identifier) {
  return identifier[0] === '@'
      ? this.elements[identifier.substring(1)].selector
      : identifier
}
