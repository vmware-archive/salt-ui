/**
 * A resource object to fetch data on minion(s)
 *
 */
define(['saltui/models/app'], function(app) {
    'use strict';

    app.factory('Minion', ['$resource', function($resource){
        var Minion = $resource('/minions/:mid', {mid: '@mid'}, {
            all: {method: 'GET'}
        });

        return Minion;
    }]);
});
