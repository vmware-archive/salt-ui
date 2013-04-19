/**
A thin wrapper around Object.create that takes a list of functional mixins that
will be applied to the new object's prototype
**/
define(function(require) {
    'use strict';

    var f = require('utils/func');

    var mixin = function(mixins, obj) {
        var proto = {},
            newobj;

        mixins.forEach(function(val) {
            val.call(proto);
        });

        newobj = Object.create(proto);
        f.extend(newobj, obj);

        return newobj;
    };

    return mixin;
});
