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

    /**
    Return the content from an XHR response; convert from JSON if possible
    **/
    var get_ret = function(x) {
        var ctype = x.getResponseHeader('content-type');

        if (ctype.indexOf('json') !== -1) {
            return JSON.parse(x.response);
        }

        return x.response;
    };

    /**
    Fire off an ajax request
    **/
    function xhr(method, path, data, headers) {
        var deferred = Q.defer(),
            req = new XMLHttpRequest(),
            def_headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            };

        // Begin building the request object
        req.open(method.toUpperCase(), path, true);

        // Add new request headers and/or override the default values
        if (!headers) headers = {};
        Object.keys(headers).forEach(function(key) {
            def_headers[key] = headers[key];
        });

        // Add all headers to the request
        Object.keys(def_headers).forEach(function(key) {
            req.setRequestHeader(key, def_headers[key]);
        });

        // Resolve or reject the deferred object based on the response code
        req.onreadystatechange = function() {
            if (this.readyState !== 4) return;

            if ((this.status >= 200 && this.status < 300
                    ) || this.status === 304) {
                deferred.resolve(get_ret(this));
            } else {
                // Show the login form if server reponds with a 401
                if (this.status === 401) {
                    window.location.hash = routes.get_url('login');
                }

                deferred.reject(
                    new Error('Server responded with status ' + this.status));
            }
        };

        // Convert the request data to a string
        req.send(JSON.stringify(data));

        // Return the promise
        return deferred.promise;
    }

    /**
    A wrapper to facilitate retrying requests

    @param {Object} opts Options to pass to xhr()
    @param {Number} [retry] If the response is empty, retry the request
    @param {Number} [timeout] Time to wait between request retries

    @return {Promise}
    **/
    function retry_xhr(opts, timeout, retries) {
        return xhr(opts).then(function(result) {
            if (typeof(result) !== 'object') return result;
            if (!result.return || result.return.length < 1) return result;

            if (Object.keys(result['return'][0]).length === 0 && retries > 0) {
                return Q.delay(timeout).then(function() {
                    return retry_xhr(opts, timeout, retries - 1);
                });
            }

            return result;
        });
    }

    return retry_xhr;
});
