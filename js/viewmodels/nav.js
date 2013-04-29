/**
Description
**/
define(function(require) {
    'use strict';

    var routes = require('conf/routes'),
        xhr = require('utils/xhr');

    var mixin = require('utils/mixin'),
        withInit = require('./mixins/withInit'),
        withAdvice = require('advice');

    var vm = mixin([withInit, withAdvice], {
        routes: routes,

        login_url: routes.get_url('login'),
        logout: function() {
            xhr('POST', '/logout');
        },
    });

    return vm;
});
