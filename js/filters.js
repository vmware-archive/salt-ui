angular.module('salt-ui-filters', []).filter('filter_grains', function() {
    return function(input, match) {
        console.log("arguments", arguments);
        return _.filter(input, function(arg) {
            var id = arg['grains.items'].id;
            return id.search(match) === 0;
        });
    };
});
