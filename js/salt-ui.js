var saltui = angular.module('salt-ui', ['salt-ui-filters']);

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
