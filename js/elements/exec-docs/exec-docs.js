/**
A custom element to display drill-down information for modules -> functions ->
function documentation for the module/function that is selected in the
<x-exec-fun/> element.

@module saltui.elements
@submmodule exec-docs
**/
define(['text!./template.html'], function(template) {
    'use strict';

    var exec_docs = {
        mixins: ['datamodel'],
        methods: {
            get_template: function() { return template; },
        },
    };

    return exec_docs;
});
