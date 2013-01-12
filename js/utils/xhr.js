/**
An XMLHttpRequest wrapper that returns promises

@module saltui.utils
@submodule xhr

@param {String} method The HTTP method to use for the request (GET, POST, etc)
@param {String} path The URL for the request
@param {Object} [data] Any data to put in the request; GET requests will use
    URL parameters, POST requests will send JSON as the reqeust body
@param {Object} [headers] Any additional headers to put in the request

@returns {Promise} result A JSON representation of the HTTP response

@example
    var req = xhr('get', '/path');
    req.then(function (result) {
        console.log(result);
    };
**/
define(['conf/routes', 'q', 'underscore'], function (routes, Q, _) {
    'use strict';

    function xhr(method, path, data, headers) {
        var deferred = Q.defer(),
            req = new XMLHttpRequest(),
            default_headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            };

        // Begin building the request object
        req.open(method.toUpperCase(), path, true);

        // Add new request headers and/or override the default values
        _.each(_.defaults(headers || {}, default_headers),
                function(value, key) {
            req.setRequestHeader(key, value);
        });

        // Resolve or reject the deferred object based on the response code
        req.onreadystatechange = function(e) {
            if (req.readyState !== 4) {
                return;
            }

            if ((req.status >= 200 && req.status < 300) || req.status === 304) {
                deferred.resolve(e.target.response);
            } else {
                deferred.reject(
                    new Error('Server responded with status ' + req.status));
            }
        };

        // Convert the request data to a string
        req.send(JSON.stringify(data));

        // Convert the response data to an object
        return deferred.promise.then(function(result) {
            return JSON.parse(result);
        });
    }

    return xhr;
});
