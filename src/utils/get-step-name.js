import {kebabCase} from 'lodash'

const getStepName = function () {
  return kebabCase(this.client.api.currentTest.name)
}

export default getStepName
