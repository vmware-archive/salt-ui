angular.module('salt-ui', ['salt-ui-filters'])
.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: '/partials/execution.html',
        controller: ExecutionCtrl
    })
    .when('/minions/:mid', {
        templateUrl: '/partials/minion-detail.html',
        controller: MinionDetailCtrl
    })
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}]);
