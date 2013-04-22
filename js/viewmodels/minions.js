/**
Description
**/
define(function(require) {
    'use strict';

    var minions = require('models/minions');

    var mixin = require('utils/mixin'),
        withInit = require('./mixins/withInit'),
        withAdvice = require('advice');

    var f = require('utils/func');

    var vm = mixin([withInit, withAdvice], {
        models: [f.sendWithCtx(minions, 'get_result')],

        refresh: null,
        minions: null,
        minion_detail: null,
        minion_detail_id: null,

        toggle_refresh: function(e) {
            // Seems there can be a race condition obtaining this value,
            // thus the fallback. More investigation needed.
            var inr = parseInt(e.target.dataset.interval, 10) || 30000;

            if (!this.refresh) {
                this.refresh = this.start_sync_results(inr);
            } else {
                this.refresh = this.stop_sync_results();
            }
        },

        /**
        Start JS Interval to refresh the list every 30 sec
        **/
        start_sync_results: function(interval) {
            minions.sync(); // kick off initial run before starting timer
            return setInterval(function() { minions.sync() }, interval);
        },
        /**
        Stop js interval
        **/
        stop_sync_results: function() {
            clearInterval(this.refresh);
            return null;
        },

        /**
        Show minion grains in a modal popup
        **/
        show_detail: function(e) {
            var mid = e.target.dataset.mid;
            this.minion_detail = minions._cache[mid];
            this.minion_detail_id = minions._cache[mid].id;
        },
        hide_detail: function() {
            this.minion_detail = null;
            this.minion_detail_id = null;
        },
    });

    vm.around('init', function(init) {
        return init().then(function() {
            vm.minions = minions._cache;
            return vm;
        });
    });

    return vm;
});
