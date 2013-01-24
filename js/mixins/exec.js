/**
A mixin to add remote execution to an element.

Requires a lowstate attribute on the element that returns a lowstate data
structure suitable to POST to the API.
**/
define(function(require) {
    'use strict';

    var xhr = require('utils/xhr'),
        xtag = require('x-tag');

    var exec = {
        onCreate: function() {
            if (!this.lowstate) {
                throw new Error("Lowstate method not found: " + this);
            }
        },

        methods: {
            /**
            Submit the execution form via Ajax and fire a custom notification
            with the job ID that is returned for other components to act on.

            @return {Promise}
            **/
            create_jid: function() {
                var that = this;

                var request = xhr('POST', '/minions', [this.lowstate])
                .get(0).get('return').then(function(result) {
                    xtag.fireEvent(that, 'exec', {jid: result.jid});
                });

                return request;
            },
        },
    };

    return exec;
});
