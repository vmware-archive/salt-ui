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
        rivets = require('rivets');

    var exec = {
        mixins: ['exec'],
        content: template,

        /**
        View-model info of interest to this element or it's children
        **/
        onCreate: function() {
            this.xtag.tgt = '*';
            this.xtag.fun = '';
            this.xtag.arg = '';
            this.xtag.inprogress = false;

            rivets.bind(this, {vm: this.xtag});
        },

        getters: {
            lowstate: function() {
                return {
                    client: 'local',
                    tgt: this.xtag.tgt,
                    fun: this.xtag.fun,
                    arg: this.xtag.arg ? this.xtag.arg.split(' ') : []
                };
            }
        },

        events: {
            submit: function(e) {
                e.preventDefault();
                var that = this;

                this.xtag.inprogress = true;

                this.create_jid()
                .then(function() {
                    that.xtag.inprogress = false;
                })
                .done();
            }
        }
    };

    return exec;
});
