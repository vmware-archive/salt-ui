/**
Minions and the grains for each

@module saltui.models
@submmodule minions
**/
define(function(require) {
    'use strict';

    var withCachedSync = require('./mixins/withCachedSync');

    function Minions() {
        this.lowstate = [{client: 'local', tgt: '*', fun: 'grains.items'}];

        /**
        Update the result cache
        **/
        this.update = function(result) {
            return result['return'][0];
        };

        /**
        Return the cached minion by id
        @return {Object}
        **/
        this.get_minion = function(id) {
           return this.result[id];
        };
    }

    /**
    Apply mixins
    **/
    withCachedSync.call(Minions.prototype);

    return new Minions();
});
