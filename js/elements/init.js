/**
All saltui custom X-Tag elements

@module saltui.elements
@returns {Object} All custom element modules, keyed by name

This module registers each element with X-Tag. Each element is prefixed with
'x-' and underscores are switched to dashes. So my_element = {} becomes
<x-my-element></x-my-element>.
**/
define(function(require) {
    'use strict';

    var elem_map = {
        context:        require('elements/context/context'),
        exec:           simpleEl(require('text!./exec/template.html')),
        dashexec:       require('elements/dashexec/dashexec'),
        exec_results:   require('elements/exec-results/exec-results'),
        login:          simpleEl(require('text!./login/template.html')),
        minion_list:    simpleEl(require('text!./minion-list/template.html')),
        nav:            simpleEl(require('text!./nav/template.html')),
    };

    // Register the modules with X-Tag
    Object.keys(elem_map).forEach(function(val) {
        document.register('x-' + val.replace(/_/, '-'), elem_map[val]);
    });

    /**
    A small factory for elements that do nothing but render a template
    **/
    function simpleEl(template) {
        return {
            'lifecycle': {
                created: function(){
                    this.innerHTML = template;
                },
            },
        };
    }

    return elem_map;
});
