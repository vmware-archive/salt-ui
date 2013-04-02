/**
Description
**/
define(function(require) {
    'use strict';

    var withCachedSync = require('./mixins/withCachedSync');

    function Keys() {
        this.lowstate = [
            {client: 'wheel', fun: 'key.finger', match: '*'},
            {client: 'wheel', fun: 'key.list_all'},
        ];

        this.update = function(result) {
            var ret = result['return'],
                m = ret[0].minions;

            return {
                pending: minion_list(ret[1].minions_pre, m),
                accepted: minion_list(ret[1].minions, m),
                rejected: minion_list(ret[1].minions_rejected, m),
            };
        };
    }

    /**
    Helper func for above

    @return {Array} A list of objects containing the id and fingerprint for
        each minion
    **/
    function minion_list(list, obj) {
        return list.map(function(val) {
            return {id: val, fp: obj[val]};
        });
    }

    /**
    Apply mixins
    **/
    withCachedSync.call(Keys.prototype);

    return new Keys();
});
