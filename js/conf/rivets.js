/**
Configure a Watch.JS Rivets adapter

http://jsfiddle.net/HCrb2/3/

@module saltui.conf
@submodule rivets
**/
define(['rivets', 'underscore', 'watch'], function(rivets, _, Watch) {
    'use strict';

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
