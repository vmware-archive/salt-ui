/**
A custom element that turns carefully crafted form buttons into salt commands and renders result into a x-tree tag 

@module saltui.elements
@submmodule dashexec

@event SaltExecution
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        rivets = require('rivets'),
        xhr = require('utils/xhr'),
        drawtree = require('./tree'),
        xtag = require('x-tag');

    var exec = {
        content: template,

        /**
        View-model info of interest to this element or it's children
        **/
        onCreate: function() {
            this.xtag.inprogress = false;

            rivets.bind(this, {vm: this.xtag});
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

                /* Use the event to find the correct button */
                var button = e.target.querySelector('button');
                var lowstate = {
                    client: 'local',
                    tgt: button.getAttribute('data-target'),
                    fun: button.getAttribute('data-fun'),
                    arg: [button.getAttribute('data-arg')]
                };


                /* Clear content */
                document.querySelector('.main').innerHTML='<div class="results"><h4>Results</h4><x-tree><i class="icon-spin icon-spinner"></i> Running ...</x-tree></div>';

                xhr('POST', '/', [lowstate])
                .get('return').get('0').then(function(result) {
                    that.xtag.inprogress = false;
                    var tgt = document.querySelector('x-tree');

                    /* Clear target */
                    while (tgt.firstChild) {
                        tgt.removeChild(tgt.firstChild);
                    }
                    drawtree(result, tgt);

                });

            },
        },
    };

    return exec;
});
