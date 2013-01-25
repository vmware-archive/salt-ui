/**
A custom element to execute Salt modules via salt-api

@module saltui.elements
@submmodule exec-results
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        xhr = require('utils/xhr'),
        rivets = require('rivets'),
        drawtree = require('./tree');

    var exec_results = {
        onCreate: function() {
            document.addEventListener('exec', this.get_results);
            this.xtag.inprogress = false;
            rivets.bind(this, {vm: this.xtag});
        },
        methods: {
            get_results: function(e) {
                var that = this;
                this.xtag.inprogress = true;
                this.innerHTML = template;

                return xhr({method: 'GET', path: '/jobs/' + e.jid})
                .then(function(result) {
                    that.xtag.inprogress = false;
                    return result;
                })
                .get('return').get(0)
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
