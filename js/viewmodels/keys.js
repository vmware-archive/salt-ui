/**
Wraps the keys model and provides context for viewing, accepting, and deleting
minion keys
**/
define(function(require) {
    'use strict';

    var keys = require('models/keys'),
        f = require('utils/func');

    var mixin = require('utils/mixin'),
        withInit = require('./mixins/withInit'),
        withAdvice = require('advice');

    var vm = mixin([withInit, withAdvice], {
        models: [f.sendWithCtx(keys, 'get_result')],

        pending: [],
        accepted: [],
        rejected: [],

        /**
        Toggle the state of all checkbox inputs for a given group
        **/
        toggle_checkboxes: function(group) {
            var boxes = f.pluckWith('checked')(this[group]),
                all_checked = boxes.every(f.isTrue),
                some_checked = boxes.some(f.isTrue);

            if (! all_checked || (some_checked && ! all_checked)) {
                this[group].forEach(check(true));
            } else {
                this[group].forEach(check(false));
            }
        },
        toggle_acc: f.applyLeft('toggle_checkboxes', 'accepted'),
        toggle_pend: f.applyLeft('toggle_checkboxes', 'pending'),
        toggle_rej: f.applyLeft('toggle_checkboxes', 'rejected'),

        /**
        Return all checked checkboxes in the given group
        **/
        checked: function(group) {
            return this[group].filter(function(val) {
                if (val.checked !== undefined && val.checked === true) {
                    return val;
                }
            });
        },

        /**
        Return true if all checkboxes in the given group are checked
        **/
        checked_all: function(group) {
            return f.pluckWith('checked')(this.checked(group)).every(f.isTrue);
        },
        checked_all_acc: f.applyLeft('checked_all', 'accepted'),
        checked_all_pend: f.applyLeft('checked_all', 'pending'),
        checked_all_rej: f.applyLeft('checked_all', 'rejected'),

        /**
        Return all minions
        **/
        show_selected: function() {
            return Array.prototype.concat.call([],
                this.pending, this.accepted, this.rejected);
        },

        /**
        Wrap keys.manage
        **/
        manage: function(action, e, view) {
            var list = Array.prototype.concat.call([],
                    this.checked('accepted'),
                    this.checked('pending'),
                    this.checked('rejected'));
            keys.manage(action, f.pluckWith('id')(list));
            view.update();
        },
        accept: f.applyLeft('manage', 'accept'),
        reject: f.applyLeft('manage', 'reject'),
        delete: f.applyLeft('manage', 'delete'),
    });

    // Set the 'checked' attribute on an object to a boolean
    var check = f.curry(function(bool, obj) { obj.checked = bool });

    vm.around('init', function(init) {
        return init().then(function() {
            vm.pending = keys._cache.pending;
            vm.accepted = keys._cache.accepted;
            vm.rejected = keys._cache.rejected;

            // Add checked property to each; pre-check all pending keys
            ['pending', 'accepted', 'rejected'].forEach(function(val) {
                // Add checked property to each; pre-check all pending keys
                vm[val].forEach(function(item) {
                    item.checked = val === 'pending' ? true : false;
                });

            });


            return vm;
        });
    });

    return vm;
});
