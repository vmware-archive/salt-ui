/**
Description
**/
define(function(require) {
    'use strict';

    var xhr = require('utils/xhr');

    var withCachedSync = require('./mixins/withCachedSync');

    function Keys() {
        this.lowstate = [
            {client: 'wheel', fun: 'key.finger', match: '*'},
            {client: 'wheel', fun: 'key.list_all'},
        ];

        this.update = function(result) {
            var ret = result['return'],
                m = ret[0];

            return {
                pending: minion_list(ret[1].minions_pre, m.minions_pre),
                accepted: minion_list(ret[1].minions, m.minions),
                rejected: minion_list(ret[1].minions_rejected,
                    m.minions_rejected),
            };
        };

        /**
        Perform an action on a list of keys

        This maps a list of keys to the glob that the accept/reject/delete
        functions are expecting
        **/
        this.manage = function(action, list) {
            var lowstate = list.map(function(val) {
                return {client: 'wheel', fun: 'key.'+ action, match: val};
            });

            return xhr('POST', '/', lowstate);
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
