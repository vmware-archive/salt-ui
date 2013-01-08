/**
A binder that ties the value of an <input> field to a variable.

@module saltui.binders
@submodule input

@example
    <p>Value of item.text: <code data-text="item.text"></code>.</p>
    <p>Text Value: <input data-input="item.text"></p>
**/
define(function(require) {
    'use strict';

    var rivets = require('rivets');

    var input = {
        publishes: true,
        routine: rivets.binders.value.routine,
        bind: function(el) {
            el.addEventListener('input', this.publish);
        },
        unbind: function(el) {
            el.removeEventListener('input', this.publish);
        }
    };

    return input;
});
