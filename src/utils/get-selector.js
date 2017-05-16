/**
 * Get the name of the selector. Helpful when using page objects.
 * Currently Nightwatch does not know how to handle identifiers in some commands,
 * if they are page object elements' identifiers (starting with '@' sign).
 *
 * This method returns the selector after "@" or the entire identifier string.
 *
 * @param {String} identifier
 * @returns {String}
 */
export const getSelector = function (identifier) {
  return identifier[0] === '@'
      ? this.elements[identifier.substring(1)].selector
      : identifier
}

export default getSelector
