define(['underscore', 'saltui/filters/app'], function(_, app) {
    'use strict';

    app.filter('filter_grains', function() {
        return function(input, match) {
            return _.filter(input, function(arg) {
                var id = arg['grains.items'].id;
                return id.search(match) === 0;
            });
        };
    });
});
