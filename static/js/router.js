define(function(require){
    "use strict";

    var _ = require('underscore'),
        Backbone = require('backbone'),
        fixtures = require('fixtures'),
        models = require('models/minions'),
        util = require('util');

    var SaltUIRouter = Backbone.Router.extend({
        routes: {
            '': 'index'
        },

        index: function() {
        }
    });

    return SaltUIRouter;
});
