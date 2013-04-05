/**
Two custom tags that comprise the currently available minion and details on
each.

@module saltui.elements
@submmodule minion-list
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
