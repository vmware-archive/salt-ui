/**
 * A resuable service to help with ajax calls to salt-api
 *
 */
define(['saltui/services/app'], function(app) {
    'use strict';

    app.factory('saltAPI', ['$http', function($http) {
        return function(lowstate, success) {
            $http.post('/', [lowstate]).success(success);
        };
    }]);
});
