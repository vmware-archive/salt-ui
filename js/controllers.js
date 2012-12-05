/**
 * Fetch grains and functions for each minion
 *
 */

var MinionListCtrl = function($scope, Minion) {
    var minions = Minion.all(function() {
        $scope.minion_list = minions['return'][0];
    });
};

// MinionListCtrl.$inject = ['$scope', 'Minion'];

/**
 * Run remote executions and display the result
 *
 */
var ExecutionCtrl = function($scope, saltAPI) {
    $scope.execution = {
        client: 'local',
        tgt: '*'
    };
    $scope.result_list = [];

    $scope.execute = function() {
        saltAPI({
            client: this.execution.client,
            tgt: this.execution.tgt,
            fun: this.execution.fun
        }, function(data) {
            $scope.result_list.push(data['return'][0]);
        });
    };
};

ExecutionCtrl.$inject = ['$scope', 'saltAPI'];
