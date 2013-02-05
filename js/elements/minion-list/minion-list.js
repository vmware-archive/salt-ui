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
            this.js_interval = this.start_sync_results();

            var that = this;
            minions.get_result()
            .then(function() {
                that.innerHTML = template;
                that.xtag.view = rivets.bind(that, {
                    model: minions,
                    vm: that.xtag});
            }).done();
        },

        events: {
            on: function() {
                this.js_interval = this.start_sync_results();
            },
            off: function() {
                this.stop_sync_results();
            }
        },
        methods: {
            /**
             * Start JS Interval to refresh the list every 30 sec
             *  TODO: 30s should be a global setting
             */
            start_sync_results: function() {
                return setInterval(function() {
                    minions.sync()
                        .then(function() {
                            // Refresh the rivets binding to pick up additions/deletions
                            if (that.xtag.view) that.xtag.view.sync();
                        });
                }, 30000);
            },
            /**
             * Stop js interval
             */
            stop_sync_results: function() {
                clearInterval(this.js_interval);

            }
        }
    };

    return minion_list;
});
