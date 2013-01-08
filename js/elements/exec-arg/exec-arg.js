/**
A custom element to display help text and default values for function
parameters for the function that has been selected in the <x-exec-fun/>
element.

@module saltui.elements
@submmodule exec-arg
**/
define(['text!./template.html'], function(template) {
    'use strict';

    var exec_arg = {
        content: template,
    };

    return exec_arg;
});
