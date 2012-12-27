/**
Use braces in templates instead of ERB-style

@module saltui.conf
@submodule templates

@example
    {{ var }}
    {{- escaped var }}
    {{# 1 + 2 }}

@example
    // Precompile the template into a function:
    var template = _.template("Hello {{ name }}!");
    template({name : "Mustache"}).source;
**/
define(['underscore'], function(_) {
    'use strict';

    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g,
        escape: /\{\{-(.*?)\}\}/g,
        evaluate: /\{\{#(.*?)\}\}/g
    };

    return null;
});
