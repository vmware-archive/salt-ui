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
        /**
        Configure event handler callbacks with the event as an arg
        and with the current model as the context
        **/
        handler: function(context, ev, binding) {
            return this.call(binding.model, ev, binding.view);
        },

        /**
        Configure two-way binding using Watch.JS
        **/
        adapter: {
            subscribe: function(obj, keypath, callback) {
                Watch.watch(obj, keypath, callback, true);
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
