var saltui = angular.module('saltui',
    ['saltui.models', 'saltui.filters']);


/**
 * Set up routes and URL handling
 *
 */
saltui.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: '/partials/execution.html',
        controller: ExecutionCtrl
    })
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}]);
