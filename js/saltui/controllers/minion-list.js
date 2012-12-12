/**
 * Fetch grains and functions for each minion
 *
 */
define(function(app) {
    'use strict';

    var MinionListCtrl = function($scope, Minion) {
        var minions = Minion.all(function() {
            $scope.minion_list = minions['return'][0];
        });
    };

    MinionListCtrl.$inject = ['$scope', 'Minion'];
    return MinionListCtrl;
});
