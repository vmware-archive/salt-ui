/**
A custom element to execute Salt modules via salt-api

@module saltui.elements
@submmodule exec-results
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        drawtree = require('./tree');

    var el = {
        'lifecycle': {
            created: function(){
                this.innerHTML = template;
                drawtree.init(this); // TODO: move this
            },
        },
    };

    return el;
});
