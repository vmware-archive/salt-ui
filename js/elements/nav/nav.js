/**
Display a navigation for all the registered URLs

@module saltui.elements
@submmodule nav
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        rivets = require('rivets'),
        routes = require('conf/routes'),
        f = require('utils/func');

    var elem = {
        content: template,

        onCreate: function() {
            this.xtag.routes = routes;

            rivets.bind(this, {vm: this.xtag});
        },

    };

    return elem;
});
