/**
A custom element to wrap the execution elements that will compose the command
to be executed

@module saltui.elements
@submmodule exec

@event SaltExecution
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        rivets = require('rivets'),
        xhr = require('utils/xhr'),
        xtag = require('x-tag');

    var exec = {
        content: template,

        /**
        View-model info of interest to this element or it's children
        **/
        onCreate: function() {
            this.xtag.fun = '';
            this.xtag.arg = '';
            this.xtag.inprogress = false;

            rivets.bind(this, {vm: this.xtag});
        },

        getters: {
            lowstate: function() {
                return {
                    client: 'local',
                    tgt: '*',
                    fun: this.xtag.fun,
                    arg: this.xtag.arg ? this.xtag.arg.split(' ') : [],
                };
            },
        },

        events: {
            /**
            Submit the execution form via Ajax and fire a custom notification
            with the job ID that is returned for other components to act on.
            **/
            submit: function(e) {
                e.preventDefault();

                var that = this;

                this.xtag.inprogress = true;

                xhr('POST', '/minions', [this.lowstate])
                .get(0).get('return').then(function(result) {
                    that.xtag.inprogress = false;
                    xtag.fireEvent(that, 'exec', {jid: result.jid});
                    that.querySelector('form').reset();
                });
            },
        },
    };

    return exec;
});
