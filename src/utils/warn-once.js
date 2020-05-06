/**
 * Derived from:
 * https://github.com/Donov4n/warning-once/blob/master/index.js
 * https://github.com/alexreardon/tiny-warning/blob/master/src/index.js
 */
export let warningOnce = function() {};

if (process.env.NODE_ENV !== 'production') {
  const warned = {};
  warningOnce = function(condition, message) {
    if (condition || (message !== undefined && warned[message])) {
      return;
    }

    // Condition not passed
    const text = `react-transition-group: ${message}`;

    // check console for IE9 support which provides console
    // only with open devtools
    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    // Throwing an error and catching it immediately
    // to improve debugging
    // A consumer can use 'pause on caught exceptions'
    // https://github.com/facebook/react/issues/4216
    try {
      throw Error(text);
    } catch (x) {} // eslint-disable-line no-empty

    warned[message] = !condition;
  };
}
