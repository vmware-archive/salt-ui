/**
A custom element to send execution commands to Salt via salt-api

@module saltui.elements
@submmodule exec-fun

@event SaltExecution
**/
define(['text!./template.html'], function(template) {
    'use strict';

    var exec_fun = {
        mixins: ['datamodel'],
        methods: {
            get_template: function() { return template; },
        },
    };

    return exec_fun;
});
