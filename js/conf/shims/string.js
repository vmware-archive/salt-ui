/**
Shims for methods on the String object that are coming in ES6

From es6-shim; MIT License

https://github.com/paulmillr/es6-shim
**/
define(function() {
    'use strict';

    if (typeof String.prototype.repeat !== 'function') {
        String.prototype.repeat = function (times) {
            if (times < 1) return '';
            if (times % 2) return this.repeat(times - 1) + this;
            var half = this.repeat(times / 2);
            return half + half;
        };
    }

    if (typeof String.prototype.startsWith !== 'function') {
        String.prototype.startsWith = function (searchString) {
            var position = arguments[1];
            var s = this.toString();
            var pos = (position === undefined) ? 0 : Number.toInteger(position);
            var len = s.length;
            var start = Math.min(Math.max(pos, 0), len);
            var searchLength = searchString.length;
            if ((searchLength + start) > len) return false;
            var index = ''.indexOf.call(s, searchString, start);
            return index === start;
        };
    }

    if (typeof String.prototype.endsWith !== 'function') {
        String.prototype.endsWith = function (searchString) {
            var endPosition = arguments[1];
            var s = this.toString();
            var len = s.length;
            var pos = (endPosition === undefined) ?
                len :
                Number.toInteger(endPosition);
            var end = Math.min(Math.max(pos, 0), len);
            var searchLength = searchString.length;
            var start = end - searchLength;
            if (start < 0) return false;
            var index = ''.indexOf.call(s, searchString, start);
            return index === start;
        };
    }

    if (typeof String.prototype.contains !== 'function') {
        String.prototype.contains = function (searchString) {
            var position = arguments[1];
            return ''.indexOf.call(this, searchString, position) !== -1;
        };
    }

    return null;
});
