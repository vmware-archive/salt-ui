/**
 * A resuable service to help with ajax calls to salt-api
 *
 */
angular.module('saltui.services', [])
.factory('saltAPI', ['$http', function($http) {
    return function(lowstate, success) {
        $http.post('/', [lowstate]).success(success);
    };
}]);
