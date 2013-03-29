/**
A functional mixin to send a single request at at time through salt-api and
keep a local cache of the response
**/
define(function(require) {
    'use strict';

    var xhr = require('utils/xhr'),
        Q = require('q');

    var withCachedSync = function() {
        // An in-progress AJAX request
        this.promise = null;

        /**
        Query the API and run update() with the result

        @returns {Promise}
        **/
        this.sync = function() {
            var that = this;

            // If we get a call while a call is already running, return the
            // existing in-progress promise
            if (this.promise === null) {
                this.promise = xhr('POST', '/', this.lowstate)
                .then(function(result) { return that.update(result) })
                .fin(function() { that.promise = null });
            }

            return this.promise;
        };

        /**
        Returns the cached copy of results or queries the API for new results
        @returns {Promise}
        **/
        this.get_result = function() {
            var that = this;

            if (Object.keys(this.result).length !== 0) {
                return Q.fcall(function() { return that.result });
            }
            return this.sync();
        };
    };

    return withCachedSync;
});
