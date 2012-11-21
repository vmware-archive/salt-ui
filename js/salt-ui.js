angular.module('salt-ui', ['salt-ui-filters'])
.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: '/tmpl/minion-list.html',
        controller: MinionListCtrl
    })
    .when('/minions/:mid', {
        templateUrl: '/tmpl/minion-detail.html',
        controller: MinionDetailCtrl
    })
    .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
}]);
