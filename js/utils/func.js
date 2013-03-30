/**
Functional-style helpers cobbled together from many-a-place

var ƒ = require('utils/func');
ƒ.merge(obj1, obj2});
**/
define(function(require) {
    'use strict';

    var Q = require('q');

    var __slice = Array.prototype.slice,
        __push = Array.prototype.push,
        __map = Array.prototype.map;

    /**
    merge
    **/
    function merge(target, source) {
        return Object.keys(source).reduce(function(accum, key) {
            return (accum[key] = source[key]) && accum;
        }, target);
    }

    /**
    extend
    **/
    function extend() {
        return __slice.call(arguments).reduce(function(target, source) {
            return merge(target, source);
        });
    }

    /**
    An identity (as in mathmatics) function; returns what is passed to it

    @param x
    @return x
    **/
    function identity(x) { return x }

    /**
    Extract the arguments of a function as an array

    From Prototype.js; MIT License
    **/
    function argumentNames(fn) {
        var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
            .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
            .replace(/\s+/g, '').split(',');
        return names.length === 1 && !names[0] ? [] : names;
    }

    /**
    From http://underscorejs.org; MIT License
    **/
    var compose = function() {
        var funcs = arguments;
        return function() {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i -= 1) {
                args = [funcs[i].apply(this, args)];
            }
            return args[0];
        };
    };

    /**
    Wraps the first function inside of the wrapper function, passing it as the
    first argument. This allows the wrapper to execute code before and after
    the function runs, adjust the arguments, and execute it conditionally.

    From http://underscorejs.org; MIT License
    **/
    function wrap(func, wrapper) {
        return function() {
            var args = [func];
            __push.apply(args, arguments);
            return wrapper.apply(this, args);
        };
    }

    /**
    From http://allong.es; MIT License
    **/
    function variadic (fn) {
        var fnLength = fn.length;

        if (fnLength < 1) {
            return fn;
        }
        else if (fnLength === 1)  {
            return function () {
                return fn.call(this, __slice.call(arguments, 0));
            };
        }
        else {
            return function () {
                var numberOfArgs = arguments.length,
                    namedArgs = __slice.call(arguments, 0, fnLength - 1),
                    numberOfMissingNamedArgs = Math.max(
                        fnLength - numberOfArgs - 1, 0),
                    argPadding = new Array(numberOfMissingNamedArgs),
                    variadicArgs = __slice.call(arguments, fn.length - 1);

                return fn.apply(this,
                    namedArgs.concat(argPadding).concat([variadicArgs]));
            };
        }
    }

    /**
    From http://allong.es; MIT License

    Applies the first argument, returns a variadic function taking the rest
    **/
    function applyFirst (fn, first) {
        return variadic( function (args) {
            return fn.apply(this, [first].concat(args));
        });
    }

    /**
    From http://allong.es; MIT License

    Applies one or more arguments in the leftmost positions
    **/
    var applyLeft = variadic( function (fn, args) {
        return variadic( function (remainingArgs) {
            return fn.apply(this, args.concat(remainingArgs));
        });
    });

    /**
    Turns any function into a mapper

        splat(function (x) { return x * x })([1, 2, 3, 4])
        //=> [1, 4, 9, 16]

    From http://allong.es; MIT License
    **/
    function splat (fn) {
        return function (list) {
            return __map.call(list,
                function(something) { return fn(something) });
        };
    }

    /**
    Grab an attribute from an object

    From http://allong.es; MIT License
    **/
    function get (attr) {
        return function (object) { return object[attr] };
    }

    /**
    Grab an attribute from a list of objects

    From http://allong.es; MIT License
    **/
    var pluck = compose(splat, get);

    /**
    Send a message/invoke a method on the receiver.

    From http://allong.es; MIT License
    **/
    var send = variadic( function (methodName, args) {
        return variadic( function (receiver, remainingArgs) {
            var fn = receiver[methodName];
            return fn.apply(receiver, args.concat(remainingArgs));
        });
    });

    /**
    Like send() but with an explicit context
    **/
    function sendWithCtx(ctx, attr) {
        var arg = __slice.call(arguments, 2);
        return ctx[attr].apply(ctx, arg);
    }

    /**
    Like send() but for methods (preserves context)

    From http://allong.es; MIT License
    **/
    function invoke (fn) {
        var args = __slice.call(arguments, 1);

        return function (instance) {
            return fn.apply(instance, args);
        };
    }

    /**
    transforms a polyadic function into a chain of unary
    functions

    From http://allong.es; MIT License

    @example
        curry(function (x, y) { return x })
        //=> function (x) { return function (y) { return x } }
    **/
    function curry (fn) {
        var arity = fn.length;

        return given([]);

        function given (argsSoFar) {
            return function curried () {
                var updatedArgsSoFar = argsSoFar.concat(
                    __slice.call(arguments, 0));

                if (updatedArgsSoFar.length >= arity) {
                    return fn.apply(this, updatedArgsSoFar);
                }
                else return given(updatedArgsSoFar);
            };
        }
    }

    /**
    From http://allong.es; MIT License
    **/
    function fluent(fn) {
        return function() {
            fn.apply(this, arguments);
            return this;
        };
    }

    /**
    From http://allong.es; MIT License
    **/
    function maybe(fn) {
        return function() {
            if (arguments.length === 0) return;

            for (var i; i < arguments.length; i += 1) {
                if (arguments[i] === null) return;
            }

            return fn.apply(this, arguments);
        };
    }

    /**
    From http://allong.es; MIT License
    **/
    function memoized (fn, keymaker) {
        var lookupTable = {};

        /*jshint expr: true */
        keymaker || (keymaker = function (args) {
            return JSON.stringify(args);
        });

        return function () {
            var key = keymaker.call(this, arguments);

            return lookupTable[key] || (
                lookupTable[key] = fn.apply(this, arguments)
            );
        };
    }

    /**
    Call a function that returns a promise. If the 'return' portion of the
    result is empty, call that function a specified number of times again
    looking for non-empty results.

    @param {Function} func A partially applied function that will return a
        promise when called
    @param {Number} [timeout] Time to wait between request retries
    @param {Number} [retry] If the response is empty, retry the request

    @return {Promise}
    **/
    function retry_promise(func, timeout, retries) {
        return func().then(function(result) {
            if (typeof(result) !== 'object') return result;
            if (!result.return || result.return.length < 1) return result;

            if (Object.keys(result['return'][0]).length === 0 && retries > 0) {
                return Q.delay(timeout).then(function() {
                    return retry_promise(func, timeout, retries - 1);
                });
            }

            return result;
        });
    }

    return {
        applyFirst: applyFirst,
        applyLeft: applyLeft,
        argumentNames: argumentNames,
        compose: compose,
        curry: curry,
        extend: extend,
        fluent: fluent,
        get: get,
        identity: identity,
        maybe: maybe,
        memoized: memoized,
        merge: merge,
        pluck: pluck,
        send: send,
        invoke: invoke,
        sendWithCtx: sendWithCtx,
        splat: splat,
        variadic: variadic,
        wrap: wrap,
        retry_promise: retry_promise,
    };

});
