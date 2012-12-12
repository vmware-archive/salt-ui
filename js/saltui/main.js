/**
 * Consolidate all the saltui-related modules into a single require-able module
 *
 */
define([
            'angular',
            'saltui/directives/main',
            'saltui/filters/main',
            'saltui/models/main',
            'saltui/services/main'
    ], function(angular) {
    'use strict';

    return angular.module('saltui', [
        'saltui.directives',
        'saltui.filters',
        'saltui.models',
        'saltui.services'
    ]);
});
