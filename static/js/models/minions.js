define(function(require){
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        $ = require('jquery'),
        fixtures = require('fixtures');

    /**
     * A model that contains all the functions and grains for a single minion.
     */
    var Minion = Backbone.Model.extend({});

    /**
     * A collection of all the currently available minions.
     */
    var Minions = Backbone.Collection.extend({
        model: Minion,

        fetch: function() {
            var mod_list = [];

            _.each(fixtures, function(val, key, list) {
                var module = {};

                module.id = key;
                module.grains = val['grains.items'];
                module.functions = {};

                // Change ["cmd.run_stdout", "cmd.run_stderr"] to
                // {"cmd": ["run_stdout", "run_stderr"]}
                _.each(val["sys.list_functions"], function(el, index, func_list) {
                    var modfunc = el.split('.'),
                        mod = modfunc[0],
                        func = modfunc[1];

                    module.functions[mod] = module.functions[mod] || [];
                    module.functions[mod].push(func);
                });

                mod_list.push(module);
            });

            this.add(mod_list);
        },

        search : function(letters){
            if(letters === '') return this;

            var pattern = new RegExp(letters,'gi');
            return _(this.filter(function(data) {
                return pattern.test(data.get('id'));
            }));
        }
    });

    /**
     * A view for a single minion
     */
    var MinionView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click a': 'clicked'
        },

        clicked: function(e){
            e.preventDefault();
            var name = this.model.get('id');
        },

        render: function(){
            var template = _.template($('#tmpl-minion').html());
            this.$el.append(template(this.model.toJSON()));
            return this;
        }
    });

    /**
     * A view that manages all the MinionViews
     */
    var MinionListView = Backbone.View.extend({
        tagName: 'ul',
        className: 'unstyled',

        events: {
            'keyup #minions-sidebar form' : 'search'
        },

        initialize: function(){
            _.bindAll(this, 'renderItem');
            this.collection.bind('reset', this.render, this);
        },

        renderItem: function(model){
            var minionView = new MinionView({model: model});
            minionView.render();
            this.$el.append(minionView.el);
        },

        render: function(){
            this.collection.each(this.renderItem);

            var filter_tmpl = _.template($('#tmpl-minions-filter').html());
            this.$el.prepend(filter_tmpl());

            return this;
        },

        search: function(e){
            var letters = e.target.value;
            this.collection.search(letters);
        }
    });

    return {
        models: {
            Minion: Minion
        },
        collections: {
            Minions: Minions
        },
        views: {
            MinionListView: MinionListView
        }
    };
});
