var saltui = angular.module('saltui',
    ['saltui.models', 'saltui.services', 'saltui.filters']);


/**
 * Set up routes and URL handling
 *
 */
saltui.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        controller: 'ExecutionCtrl',
        templateUrl: '/partials/execution.html'
    });

    $routeProvider.otherwise({redirectTo: '/'});
}]);
