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
 * See if element is enabled.
 * @method enabled
 * @param {string} selector
 * @param {string} [msg = null]
 */

var Enabled = function (_EventEmitter) {
  inherits(Enabled, _EventEmitter);

  function Enabled(selector) {
    var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    classCallCheck(this, Enabled);

    var _this = possibleConstructorReturn(this, (Enabled.__proto__ || Object.getPrototypeOf(Enabled)).call(this));

    _this.MSG_DEFAULT = 'Testing if element <' + selector + '> is enabled.';

    _this._message = msg || _this.MSG_DEFAULT;
    _this._selector = selector;
    return _this;
  }

  createClass(Enabled, [{
    key: 'command',
    value: function command(callback) {
      return this.api.element(this.client.locateStrategy, this._selector, function (result) {
        return this.elementIdEnabled(result.value.ELEMENT, callback);
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
      return true;
    }
  }]);
  return Enabled;
}(events.EventEmitter);

var enabled = {
  assertion: Enabled
};

module.exports = enabled;
