define(['saltui/directives/app'], function(app) {
    'use strict';

    app.directive('minion-list', function($compile) {
        return {
            templateUrl: '/path/to/some/template.html',
            replace : false,
            link : function($scope, $element, attributes) {
                $scope.title = '...';
            }
        };
    });
});
