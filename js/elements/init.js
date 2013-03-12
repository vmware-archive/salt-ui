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

    var xtag = require('x-tag');
    var elem_map = {
        exec:           require('elements/exec/exec'),
        dashexec:       require('elements/dashexec/dashexec'),
        exec_results:   require('elements/exec-results/exec-results'),
        login:          require('elements/login/login'),
        minion_detail:  require('elements/minion-detail/minion-detail'),
        minion_list:    require('elements/minion-list/minion-list'),
        modal:          require('elements/modal/modal'),
        nav:            require('elements/nav/nav'),
        toggle_switch:  require('elements/toggle-switch/toggle-switch'),
    };

    // Register the modules with X-Tag
    Object.keys(elem_map).forEach(function(val) {
        xtag.register('x-' + val.replace(/_/, '-'), elem_map[val]);
    });

    return elem_map;
});
