/**
Specify a view-model via the data-vm attribute and this tag will bind that
view-model to the context for this element and its children
**/
define(function(require) {
    'use strict';

    var rivets = require('rivets');

    var viewmodels = require('viewmodels/init');

    var el = {
        'lifecycle': {
            created: function(){
                var that = this,
                    viewmodel = viewmodels[this.dataset.vm];

                if (! viewmodel) {
                    throw new Error("Viewmodel '"+ this.dataset.vm +
                        "' not found on element '"+ this +"'");
                }

                viewmodel.init().then(function(vm) {
                    that.__view__ = rivets.bind(that, {vm: vm});
                }).done();
            },
            removed: function(){
                this.__view__.unbind();
            },
            attributeChanged: function(attr, value){
                console.log('x-foo attributeChanged', this, attr, value);
            },
        },
    };

    return el;
});
