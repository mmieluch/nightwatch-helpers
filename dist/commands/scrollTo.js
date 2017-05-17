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
     * @returns {scrollTo}
     */
    value: function command() {
      console.log('scrolling to the bastard!');
      return this.complete();
    }

    /**
     * Emit a "complete" event and return the command instance.
     * @fires EventEmitter#complete
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
