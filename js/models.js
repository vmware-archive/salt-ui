/**
 * A resource object to fetch data on minion(s)
 *
 */
angular.module('saltui.models', ['ngResource'])
.factory('Minion', ['$resource', function($resource){
    var Minion = $resource('/minions/:mid', {mid: '@mid'}, {
        all: {method: 'GET'}
    });

    return Minion;
}]);

/**
 * A resource object to fetch data on job(s)
 *
 */
angular.module('saltui.models', ['ngResource'])
.factory('Jobs', ['$resource', function($resource){
    var Jobs = $resource('/jobs/:jid', {jid: '@jid'}, {
        all: {method: 'GET'}
    });

    return Jobs;
}]);

