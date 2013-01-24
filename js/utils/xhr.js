/**
An XMLHttpRequest wrapper that returns promises

@module saltui.utils
@submodule xhr

@param {Object} opts An object of xhr params
    @param {String} opts.method The HTTP method to use for the request (GET,
        POST, etc)
    @param {String} opts.path The URL for the request
    @param {Object} [opts.data] Any data to put in the request; GET requests
        will use URL parameters, POST requests will send JSON as the reqeust
        body
    @param {Object} [opts.headers] Any additional headers to put in the request

@returns {Promise} result A JSON representation of the HTTP response

@example
    var req = xhr({method: 'get', path: '/path'});
    req.then(function (result) {
        console.log(result);
    };
**/
define(function (require) {
    'use strict';

    var routes = require('conf/routes'),
        Q = require('q');

    function xhr(opts) {
        var deferred = Q.defer(),
            req = new XMLHttpRequest(),
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            };

        // Begin building the request object
        req.open(opts.method.toUpperCase(), opts.path, true);

        // Add new request headers and/or override the default values
        if (!opts.headers) opts.headers = {};
        Object.keys(opts.headers).forEach(function(key) {
            headers[key] = opts.headers[key];
        });

        // Add all headers to the request
        Object.keys(headers).forEach(function(key) {
            req.setRequestHeader(key, headers[key]);
        });

        // Resolve or reject the deferred object based on the response code
        req.onreadystatechange = function(e) {
            if (req.readyState !== 4) {
                return;
            }

            if ((req.status >= 200 && req.status < 300) || req.status === 304) {
                deferred.resolve(e.target.response);
            } else {
                // Show the login form if server reponds with a 401
                if (req.status === 401) {
                    window.location.hash = routes.get_url('login');
                }

                deferred.reject(
                    new Error('Server responded with status ' + req.status));
            }
        };

        // Convert the request data to a string
        req.send(JSON.stringify(opts.data));

        // Convert the response data to an object
        return deferred.promise.then(function(result) {
            return JSON.parse(result);
        });
    }

    return xhr;
});
