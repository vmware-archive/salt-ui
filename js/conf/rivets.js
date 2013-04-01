/**
Configure a Watch.JS Rivets adapter

http://jsfiddle.net/HCrb2/3/

@module saltui.conf
@submodule rivets
**/
define(function(require) {
    'use strict';

    var rivets = require('rivets'),
        Watch = require('watch');

    rivets.configure({
        adapter: {
            subscribe: function(obj, keypath, callback) {
                Watch.watch(obj, keypath, callback);
            },
            unsubscribe: function(obj, keypath, callback) {
                Watch.unwatch(obj, keypath, callback);
            },
            read: function(obj, keypath) {
                return obj[keypath];
            },
            publish: function(obj, keypath, value) {
                obj[keypath] = value;
            }
        }
    });

    return null;
});
