define(function(require){
    "use strict";

    var _ = require('underscore'),
        Backbone = require('backbone'),
        fixtures = require('fixtures'),
        minions = require('models/minions'),
        $ = require('jquery'),
        util = require('util');

    var SaltUIRouter = Backbone.Router.extend({
        routes: {
            '': 'index'
        },

        index: function() {
            var minions_collection = new minions.collections.Minions();
            minions_collection.fetch();
            var minion_list = new minions.views.MinionListView({
                collection: minions_collection
            });
            minion_list.render();
            $('#minions-sidebar').html(minion_list.el);
        }
    });

    return SaltUIRouter;
});
