/**
Two custom tags that comprise the currently available minion and details on
each.

@module saltui.elements
@submmodule minion-list
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        minions = require('models/minions'),
        rivets = require('rivets');

    var minion_list = {
        onCreate: function(){
            var that = this;

            minions.get_result()
            .then(function() {
                that.innerHTML = template;
                that.xtag.view = rivets.bind(that, {
                    model: minions,
                    elem: that,
                    vm: that.xtag});
            }).done();
        },

        methods: {
            toggle_refresh: function(e) {
                var inr = parseInt(e.target.dataset.interval, 10);

                if (!this.xtag.refresh) {
                    this.xtag.refresh = this.start_sync_results(inr);
                } else {
                    this.xtag.refresh = this.stop_sync_results();
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
                clearInterval(this.xtag.refresh);
                return null;
            }
        }
    };

    return minion_list;
});
