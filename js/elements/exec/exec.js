/**
A custom element to wrap the execution elements that will compose the command
to be executed

@module saltui.elements
@submmodule exec

@event SaltExecution
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html');

    var el = {
        'lifecycle': {
            created: function(){
                this.innerHTML = template;
            },
        },
    };

    return el;
});
