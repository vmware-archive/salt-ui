/**
A drop-in replacement for xhr() that serves local fixtures instead of
making ajax requests
**/
define(function(require) {
    'use strict';

    var Q = require('q'),
        f = require('utils/func');

    var lowstate_table = {
        'local': {
            'grains': {
                'items': 'fixtures/grains.json',
            },
        },
    };

    /**
    A stub function that matches the signature and return of the xhr() function
    **/
    function xhr_stub(method, path, data) {
        var deferred = Q.defer();

        // Parse all responses as JSON and return the expected data structure
        var callback = function() {
            var fixture_strings = Array.prototype.slice.call(arguments),
                fixtures = fixture_strings.map(JSON.parse);

            deferred.resolve({return: fixtures});
        };

        // Create lookup strings for each lowstate chunk in ``data`` so we can
        // pull URLs out of lowstate_table
        var lowstate_strings = data.map(function(chunk) {
            return chunk.client + '.' + chunk.fun;
        });

        // Grab the fixture URL for each lookup string
        var fixture_urls = lowstate_strings.map(function(lowstate) {
            try {
                return 'text!' + f.deepGet(lowstate_table, lowstate);
            } catch(e) {
                deferred.reject(
                    new Error('Fixture not defined for: '+ lowstate));
            }
        });

        // Asyncronously fetch all fixtures and return the result as a promise
        require(fixture_urls, callback);
        return deferred.promise;
    }

    return xhr_stub;
});
