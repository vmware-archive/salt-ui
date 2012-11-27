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

/**
 * Run remote executions and display the result
 *
 */
function ExecutionCtrl($scope, $http) {
    $scope.execution = {
        client: 'local',
        tgt: '*'
    };
    $scope.result_list = [];

    $scope.execute = function() {
        $http.post('/', [{
            client: this.execution.client,
            tgt: this.execution.tgt,
            fun: this.execution.fun
        }]).success(function(data) {
            $scope.result_list.push(data['return'][0]);
        });
    };
}

function MinionDetailCtrl($scope, $routeParams) {
    $scope.mid = $routeParams.mid;
}

// MinionDetailCtrl.$inject = ['$scope', '$routeParams'];


// Return the master configuration values
function MasterConfigValues($scope, $http) {
    $http.post('/', {
        client: 'wheel',
        fun: 'config.values'}).success(function(data) {
            $scope.master_config = data;
        });
}

// Apply a configuration value to the master config
function MasterConfigApply($scope, $http, key, value) {
    $http.post('/', {
        client: 'wheel',
        key: key,
        value: value
    });
}
