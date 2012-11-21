function MinionListCtrl($scope, $http) {
    $http.get('/fixtures/minions.json').success(function(data) {
        $scope.minion_list = data[0];
    });
}

// MinionListCtrl.$inject = ['$scope', '$http'];

function MinionDetailCtrl($scope, $routeParams) {
    $scope.mid = $routeParams.mid;
}

// MinionDetailCtrl.$inject = ['$scope', '$routeParams'];
