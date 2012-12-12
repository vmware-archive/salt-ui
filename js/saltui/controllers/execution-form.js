/**
 * Run remote executions and display the result
 *
 */
define(function(app) {
    'use strict';

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
    return ExecutionFormCtrl;
});
