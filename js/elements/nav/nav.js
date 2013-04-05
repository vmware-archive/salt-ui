/**
Display a navigation for all the registered URLs

@module saltui.elements
@submmodule nav
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
