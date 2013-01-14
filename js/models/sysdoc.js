/**
All execution modules and the inline docs for each function therein

@module saltui.models
@submmodule sysdoc
**/
define(function(require) {
    'use strict';

    var xhr = require('utils/xhr'),
        Q = require('q'),
        _ = require('underscore');

    var sysdoc = {
        // A cache of the last query
        _result: {},
        // A filtered list of _result based on user input
        _list: [],
        // The current user input
        _filter_text: '',
        // An in-progress AJAX request
        _promise: null,

        /**
        Reformat {'mod.func': docs} into nested objects: {mod: {func: docs}}
        **/
        _update: function(result) {
            var i = {};
            _.each(result, function(value, key) {
                var name = key.split('.');
                i[name[0]] = i[name[0]] || {};
                i[name[0]][name[1]] = value;
            });

            // Default list is module names
            if (this._list.length === 0) {
                this._list = _.keys(i).sort();
            }

            this._result = i;
            return this._result;
        },

        /**
        Filter modules, functions, and docs from the sysdoc data structure by
        filtering on module names until a dot ``.`` is entered, then switch to
        filtering on function names in that module.
        **/
        _filter: function() {
            var modfunc,
                ret;

            // Short-circuit if nothing to filter by
            if (! this._filter_text) {
                return this._list;
            }

            modfunc = this._filter_text.split('.');

            if (modfunc.length === 2) {
                this._list = _.keys(this._result[modfunc[0]]).sort();

                // If we have identified a single function, short-circuit and
                // display the docs
                ret = this._result[modfunc[0]][modfunc[1]];

                if (ret) {
                    return [ret];
                }
            } else {
                this._list = _.keys(this._result).sort();
            }

            return _.filter(this._list, function(val) {
                return val.search(_.last(modfunc)) === 0;
            });
        },

        /**
        Fetch modules and functions, and docs for each, from the API

        @return {Promise}
        **/
        sync: function() {
            // If we get a call while a call is already running, return the
            // promise for the one already running
            if (this._promise === null) {
                this._promise = xhr('POST', '/',
                    [{client: 'runner', fun: 'sys.doc'}])
                .get('return')
                .get(0)
                .then(this._update.bind(this))
                .fin(function(){ this._promise = null; }.bind(this));
            }

            return this._promise;
        },

        /***
        Returns the cached copy of results or queries the API for new results
        @returns {Promise}
        ***/
        get_result: function() {
            if (! _.isEmpty(this._result)) {
                return Q.fcall(function(){ return this._result; }.bind(this));
            }
            return this.sync();
        },
    };

    return sysdoc;
});
