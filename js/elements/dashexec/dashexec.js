/**
A custom element that turns carefully crafted form buttons into salt commands
and renders result into a x-tree tag

@module saltui.elements
@submmodule dashexec

@event SaltExecution
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        rivets = require('rivets');

    var exec = {
        mixins: ['exec'],
        content: template,

        onCreate: function() {
            this.xtag.inprogress = false;
            this.xtag.content = this.dataset.content;
            rivets.bind(this, {vm: this.xtag});
        },

        getters: {
            lowstate: function() {
                return {
                    client: this.dataset.client || 'local',
                    tgt: this.dataset.tgt || '*',
                    fun: this.dataset.fun,
                    arg: this.xtag.arg ? this.xtag.arg.split(' ') : [],
                };
            },
        },

        events: {
            click: function(e) {
                e.preventDefault();

                var that = this;

                this.xtag.inprogress = true;
                this.create_jid().then(function() {
                    that.xtag.inprogress = false;
                });
            },
        },
    };

    return exec;
});
