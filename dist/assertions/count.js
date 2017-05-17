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
 * @method count
 * @param {string} selector
 * @param {number} expected
 * @param {string} [msg = null]
 */

var Count = function (_EventEmitter) {
  inherits(Count, _EventEmitter);

  function Count(selector, expected) {
    var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    classCallCheck(this, Count);

    var _this = possibleConstructorReturn(this, (Count.__proto__ || Object.getPrototypeOf(Count)).call(this));

    _this.MSG_DEFAULT = 'Testing if there is exactly ' + expected + ' instances of element <' + selector + '>.';
    _this.MSG_ELEMENT_NOT_FOUND = _this.MSG_DEFAULT + ' Element could not be located.';

    _this._message = msg || _this.MSG_DEFAULT;
    _this._selector = selector;
    _this._expected = expected;
    return _this;
  }

  createClass(Count, [{
    key: 'command',
    value: function command(callback) {
      var self = this;

      return this.api.execute(
      // Performed in-browser.
      function (selector) {
        return document.querySelectorAll(selector).length;
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
      return result.status !== 0 ? null : result.value;
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
      return this._expected;
    }
  }]);
  return Count;
}(events.EventEmitter);

var count = {
  assertion: Count
};

module.exports = count;
