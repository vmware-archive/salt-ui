/**

@module saltui.elements
@submmodule login
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
