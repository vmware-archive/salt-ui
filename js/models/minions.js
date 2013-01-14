/**
Minions and the grains for each

@module saltui.models
@submmodule minions
**/
define(function(require) {
    'use strict';

    var xhr = require('utils/xhr'),
        Q = require('q'),
        _ = require('underscore');

    var minions = {
        // A cache of the last return from the API.
        _result: {},
        // An in-progress AJAX request
        _promise: null,

        /**
        Update the result cache
        **/
        _update: function(result) {
            return _.extend(this._result, result);
        },

        /**
        Fetch grains for all minions from the API

        @return {Promise}
        **/
        sync: function() {
            // If we get a call while a call is already running, return the
            // promise for the one already running
            if (this._promise === null) {
                this._promise = xhr('POST', '/',
                    [{client: 'local', tgt: '*', fun: 'grains.items'}])
                .get('return')
                .get(0)
                .then(this._update.bind(this))
                .fin(function(){ this._promise = null; }.bind(this));
            }

            return this._promise;
        },

        /**
        Returns the cached copy of results or queries the API for new results
        @returns {Promise}
        **/
        get_result: function() {
            if (! _.isEmpty(this._result)) {
                return Q.fcall(function(){ return this._result; }.bind(this));
            }
            return this.sync();
        },
    };

    return minions;
});
