var saltui_models = angular.module('saltui.models', ['ngResource']);

/**
 * A resource object to fetch data on minion(s)
 *
 */
saltui_models.factory('Minion', ['$resource', function($resource){
    var Minion = $resource('/minions/:mid', {mid: '@mid'}, {
        all: {method: 'GET'}
    });

    return Minion;
}]);

/**
 * A resource object to fetch data on job(s)
 *
 */
saltui_models.factory('Jobs', ['$resource', function($resource){
    var Jobs = $resource('/jobs/:jid', {jid: '@jid'}, {
        all: {method: 'GET'}
    });

    return Jobs;
}]);
