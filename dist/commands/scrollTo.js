'use strict';

var events = require('events');

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
var getSelector = function getSelector(identifier) {
  return identifier[0] === '@' ? this.elements[identifier.substring(1)].selector : identifier;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * @class scrollTo
 * @extends EventEmitter
 * @module @mmieluch/nightwatch-helpers/commands
 */

var scrollTo = function (_EventEmitter) {
  inherits(scrollTo, _EventEmitter);

  function scrollTo() {
    classCallCheck(this, scrollTo);
    return possibleConstructorReturn(this, (scrollTo.__proto__ || Object.getPrototypeOf(scrollTo)).apply(this, arguments));
  }

  createClass(scrollTo, [{
    key: 'command',

    /**
     * @param {string} [selector = null]
     * @returns {scrollTo}
     */
    value: function command() {
      var _this2 = this;

      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      // No selector === no work. Like me, but with coffee.
      if (selector === null) return this.complete();
      // Prepare to tell the world the job is done.
      var emitComplete = this.emit.bind(this, 'complete');
      // Transform the selector, in case the "@" sign is too baffling for Nightwatch.
      var sel = getSelector(selector);

      // Establish the location of the element.
      this.getLocation(sel)
      // Set window position to the found coordinates.
      .then(function (coordinates) {
        return _this2.scrollTo(coordinates.y);
      }).then(emitComplete).catch(function (err) {
        console.error(err);
        emitComplete();
      });

      return this;
    }

    /**
     * Promisify `setWindowPosition` to avoid callback hell.
     * @param {number} [y = 0]
     * @returns {Promise}
     */

  }, {
    key: 'scrollTo',
    value: function scrollTo() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (y === 0) console.warn('The value for the `y` coordinate was passed in as 0.');

      var self = this;

      return new Promise(function (resolve, reject) {
        self.api.execute(function (y) {
          window.scroll(0, y);
        }, [y], function (result) {
          resolve(true);
        });
      });
    }

    /**
     * Promisify `getLocation` function to avoid callback hell.
     * @param selector
     * @returns {Promise}
     */

  }, {
    key: 'getLocation',
    value: function getLocation(selector) {
      var self = this;

      return new Promise(function (resolve, reject) {
        self.api.getLocation(selector, function (result) {
          if (result.status !== 0) reject(result);

          resolve({
            x: result.value.x,
            y: result.value.y
          });
        });
      });
    }

    /**
     * Emit a "complete" event and return the command instance.
     * @fires EventEmitter#complete
     * @returns {scrollTo}
     */

  }, {
    key: 'complete',
    value: function complete() {
      this.emit('complete');
      return this;
    }
  }]);
  return scrollTo;
}(events.EventEmitter);

module.exports = scrollTo;
