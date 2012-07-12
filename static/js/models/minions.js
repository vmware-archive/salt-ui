/*jshint laxcomma:true */

define(function(require){
    "use strict";

    var _ = require('underscore'),
        Backbone = require('backbone'),
        fixtures = require('fixtures');

    /**
     * A model that contains all the functions and grains for a single minion.
     */
    var Minion = Backbone.Model.extend({
        fetch: function() {
            this.id = fixtures.grains.saltdev.id;
            this.grains = fixtures.grains.saltdev;

            this.functions = [];

            // Change ["cmd.run_stdout", "cmd.run_stderr"] to
            // {"cmd": ["run_stdout", "run_stderr"]}
            _.each(fixtures.functions.saltdev, function(el, index, list) {
                var modfunc = el.split('.'),
                    mod = modfunc[0],
                    func = modfunc[1];

                this[mod] = this[mod] || [];
                this[mod].push(func);
            }, this.functions);

            return this;
        }
    });

    /**
     * A collection of all the currently available minions.
     */
    var Minions = Backbone.Collection.extend({
        model: Minion
    });

    /**
     * A collection of all the available grains items across all minions.
     */
    var Grains = Backbone.Collection.extend({
        tagName: 'li',

        initialize: function() {
            this.template = $('#grains-list');
        },

        events: {
        },

        render: function() {
            var content = this.template.tmpl(this.model.toJSON());
        }
    });

    /**
     * A list of all minions
     */
    var MinionList = Backbone.View.extend({
    });

    /**
     * A list of all grains across all models
     */
    var GrainsList = Backbone.View.extend({
    });

    /**
     * A list of all functions across all models
     */
    var FunctionsList = Backbone.View.extend({
    });

    return {
        models: {
            Minion: Minion
        },
        collections: {
            Minions: Minions,
            Grains: Grains
        },
        views: {
            MinionList: MinionList,
            GrainsList: GrainsList,
            FunctionsList: FunctionsList
        }
    };
});
