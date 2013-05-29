/**
Description
**/
define(function(require) {
    'use strict';

    var sysdoc = require('models/sysdoc'),
        f = require('utils/func');

    var mixin = require('utils/mixin'),
        withInit = require('./mixins/withInit'),
        withAdvice = require('advice');

    var vm = mixin([withInit, withAdvice], {
        models: [f.sendWithCtx(sysdoc, 'get_result')],

        /**
        Return a list of all module names
        **/
        modules: function() {
            return Object.keys(sysdoc._cache);
        },

        /**
        Return a list of module.fun for all functions
        **/
        funs: function() {
            var i = [];

            Object.keys(sysdoc._cache).forEach(function(key) {
                Object.keys(sysdoc._cache[key]).map(function(val) {
                    i.push(key +'.'+ val);
                });
            });

            return i.sort();
        },
    });

    return vm;
});
