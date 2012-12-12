/**
 * A controller to manage all the execution controllers: the form that displays
 * the available modules and functions, running the execution, and displaying
 * the results
 *
 */
define(function(app) {
    'use strict';

    var ExecutionCtrl = function($scope, Minion) {
        var minions = Minion.all(function() {
            $scope.minion_list = minions['return'][0];
        });
    };

    ExecutionCtrl.$inject = ['$scope', 'Minion'];
    return ExecutionCtrl;
});
