/**
Various polyfills for the String object

Augmenting default objects will be kept to a minimum in this project, however
even in ES5 the String object is still lacking in some very basic features.

@module String
@attribute supplant
@attribute repeat
@attribute startsWith
@attribute endsWith
@attribute contains
**/
define(function() {
    'use strict';

    /**
    supplant() does variable substitution on the string. It scans through the
    string looking for expressions enclosed in { } braces. If an expression is
    found, use it as a key on the object, and if the key has a string value or
    number value, it is substituted for the bracket expression and it repeats.

    http://javascript.crockford.com/remedial.html

    @example
    param = {domain: 'valvion.com', media: 'http://media.valvion.com/'};
    url = "{media}logo.gif".supplant(param);
    **/
    if (typeof String.prototype.supplant !== 'function') {
        String.prototype.supplant = function (o) {
            return this.replace(/{([^{}]*)}/g,
                function (a, b) {
                    var r = o[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        };
    }

    /**
    The following appropriated from es6-shim

    https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js
    **/
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
