const getModuleName = function () {
  return this.client.api.currentTest.module
}

export default getModuleName
