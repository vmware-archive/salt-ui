/**
Description
**/
define(function(require) {
    'use strict';

    var minions = require('models/minions');

    var vm = {
        minions: null,
        refresh: null,

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
        }
    };

    var init = function() {
        var that = this;

        minions.get_result().then(function(result) {
            that.minions = result;
        }).done();
    };

    init.call(vm);
    return vm;
});
