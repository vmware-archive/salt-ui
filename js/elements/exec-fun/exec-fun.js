/**
A custom element to send execution commands to Salt via salt-api

@module saltui.elements
@submmodule exec-fun

@event SaltExecution
**/
define(['text!./template.html'], function(template) {
    'use strict';

    var exec_fun = {
        content: template,
        mixins: ['datamodel'],
    };

    return exec_fun;
});
