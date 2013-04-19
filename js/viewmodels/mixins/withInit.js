/**
A functional mixin that adds an init() method to an object
**/
define(function(require) {
    'use strict';

    var Q = require('q');

    var withInit = function() {
        this.init = function() {
            var that = this;

            if (this.models) {
                var all = this.models.map(function(fn) { return fn() });
                return Q.all(all).then(function() { return that });
            } else {
                return Q.fcall(function() { return that });
            }
        };
    };

    return withInit;
});
