/**
Minions and the grains for each

@module saltui.models
@submmodule minions
**/
define(function(require) {
    'use strict';

    var withCachedSync = require('./mixins/withCachedSync');

    function Model() {
        this.lowstate = [{client: 'local', tgt: '*', fun: 'grains.items'}];
        this.result = {};

        /**
        Update the result cache
        **/
        this.update = function(result) {
            this.result = result['return'][0];
        };

        /**
        Return the cached minion by id
        @return {Object}
        **/
        this.get_minion = function(id) {
           return this.result[id];
        };
    }

    var model = new Model();
    withCachedSync.call(model);
    return model;
});
