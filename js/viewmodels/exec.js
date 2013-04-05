/**
Description
**/
define(function(require) {
    'use strict';

    var xhr = require('utils/xhr');

    var vm = {
        client: 'local',
        tgt: '*',
        fun: '',
        arg: '',

        inprogress: false,

        /**
        Return the form fields values as a lowstate data structure
        **/
        lowstate: function() {
            return {
                client: this.client,
                tgt: this.tgt,
                fun: this.fun,
                arg: this.arg ? this.arg.split(' ') : [],
            };
        },

        /**
        Send the execution
        **/
        submit: function(e) {
            e.preventDefault();
            var that = this;

            this.inprogress = true;

            this.create_jid()
            .then(function() {
                that.inprogress = false;
            })
            .done();
        },

       /**
       Submit the execution form via Ajax and fire a custom notification
       with the job ID that is returned for other components to act on.

       @return {Promise}
       **/
       create_jid: function() {
           var that = this;

           return xhr('POST', '/minions', [this.lowstate()])
           .get(0).get('return')
           .then(function(result) {
                // TODO: make a mixin out of this
                document.register.__polyfill__.fireEvent(null, 'exec', {
                    jid: result.jid,
                    lowstate: that.lowstate(),
                });
           });
       },
    };

    return vm;
});
