/**
A custom element to execute Salt modules via salt-api

@module saltui.elements
@submmodule exec-results
**/
define(function(require) {
    'use strict';

    var xhr = require('utils/xhr'),
        drawtree = require('./tree');

    var exec_results = {
        onCreate: function() {
            document.addEventListener('exec', this.get_results);
        },
        methods: {
            get_results: function(e) {
                return xhr('GET', '/jobs/' + e.jid).get('return').get(0)
                .then(this.render);
            },
            render: function(result) {
                // this.innerHTML = JSON.stringify(result);

                // empty the node
                while (this.firstChild) {
                    this.removeChild(this.firstChild);
                }

                // fill the node with the output
                drawtree(result, this);
            },
        },
    };

    return exec_results;
});
