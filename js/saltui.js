var saltui = angular.module('saltui',
    ['saltui.models', 'saltui.services', 'saltui.filters']);


/**
 * Set up routes and URL handling
 *
 */
saltui.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/minions', {
        controller: 'MinionListCtrl',
        templateUrl: '/partials/minion-list.html'
    });

    $routeProvider.otherwise({redirectTo: '/minions'});
}]);
