/**
 * Fetch grains and functions for each minion
 *
 */
var MinionListCtrl = function($scope, Minion) {
    var minions = Minion.all(function() {
        $scope.minion_list = minions['return'][0];
    });
};

MinionListCtrl.$inject = ['$scope', 'Minion'];

/**
 * Run remote executions and display the result
 *
 */
var ExecutionFormCtrl = function($scope, saltAPI) {
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

ExecutionFormCtrl.$inject = ['$scope', 'saltAPI'];

/**
 * A controller to manage all the execution controllers: the form that displays
 * the available modules and functions, running the execution, and displaying
 * the results
 *
 */
var ExecutionCtrl = function($scope, Minion) {
    var minions = Minion.all(function() {
        $scope.minion_list = minions['return'][0];
    });
};

ExecutionCtrl.$inject = ['$scope', 'Minion'];
