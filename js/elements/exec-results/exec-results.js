/**
A custom element to execute Salt modules via salt-api

@module saltui.elements
@submmodule exec-results
**/
define(['text!./template.html'], function(template) {
    'use strict';

    var exec_results = {
        content: template,
    };

    return exec_results;
});
