import kebabCase from 'lodash.kebabcase'

const getStepName = function () {
  return kebabCase(this.client.api.currentTest.name)
}

export default getStepName
