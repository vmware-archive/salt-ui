/**
 * A resource object to fetch data on job(s)
 *
 */
define(['saltui/models/app'], function(app) {
    'use strict';

    app.factory('Jobs', ['$resource', function($resource){
        var Jobs = $resource('/jobs/:jid', {jid: '@jid'}, {
            all: {method: 'GET'}
        });

        return Jobs;
    }]);
});
