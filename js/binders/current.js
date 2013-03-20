/**
Wraps the builtin 'class-*' binder and passes true if the given value matches
the current Path.js route

@module saltui.binders
@submodule current
**/
define(function(require) {
    'use strict';

    var rivets = require('rivets'),
        path = require('path');

    var binding = function(el, val) {
        return rivets.binders['class-*'].call(
            this, el, path.routes.current === val);
    };

    return binding;
});
