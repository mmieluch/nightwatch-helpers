'use strict';

var events = require('events');

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
 * Verify element "non-checkedness" :)
 * @method unchecked
 * @param {string} selector
 * @param {string} [msg = null]
 */

var Unchecked = function (_EventEmitter) {
  inherits(Unchecked, _EventEmitter);

  function Unchecked(selector) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    classCallCheck(this, Unchecked);

    var _this = possibleConstructorReturn(this, (Unchecked.__proto__ || Object.getPrototypeOf(Unchecked)).call(this));

    _this.MSG_DEFAULT = 'Testing if element <' + selector + '> is unchecked.';

    _this._message = msg || _this.MSG_DEFAULT;
    _this._selector = selector;
    return _this;
  }

  createClass(Unchecked, [{
    key: 'command',
    value: function command(callback) {
      var self = this;

      return this.api.execute(
      // Performed in-browser.
      function (selector) {
        return document.querySelector(selector).checked;
      },
      // Array of arguments.
      [this._selector],
      // Callback
      function (result) {
        callback.call(self, result);
      });
    }
  }, {
    key: 'value',
    value: function value(result) {
      return result.value;
    }
  }, {
    key: 'pass',
    value: function pass(value) {
      return value === this.expected;
    }
  }, {
    key: 'message',
    get: function get$$1() {
      return this._message;
    }
  }, {
    key: 'expected',
    get: function get$$1() {
      return false;
    }
  }]);
  return Unchecked;
}(events.EventEmitter);

var unchecked = {
  assertion: Unchecked
};

module.exports = unchecked;
