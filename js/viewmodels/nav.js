/**
Description
**/
define(function(require) {
    'use strict';

    var routes = require('conf/routes');

    var mixin = require('utils/mixin'),
        withInit = require('./mixins/withInit'),
        withAdvice = require('advice');

    var vm = mixin([withInit, withAdvice], {
        routes: routes,
    });

    return vm;
});
