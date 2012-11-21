function MinionListCtrl($scope, $http) {
    $http.post('/', [{
        client: 'local',
        tgt: '*',
        fun: ['grains.items', 'sys.list_functions'],
        arg: [[], []]
    }]).success(function(data) {
        $scope.minion_list = data['return'][0];
    });
}

// MinionListCtrl.$inject = ['$scope', '$http'];

function MinionDetailCtrl($scope, $routeParams) {
    $scope.mid = $routeParams.mid;
}

// MinionDetailCtrl.$inject = ['$scope', '$routeParams'];
