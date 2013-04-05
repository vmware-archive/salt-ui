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
                if (! this.dataset.vm || ! viewmodels[this.dataset.vm]) {
                    throw new Error("View-model not found: "+ this.dataset.vm);
                }

                this.__view__ = rivets.bind(this,
                    {vm: viewmodels[this.dataset.vm]});
            },
            removed: function(){
                console.log('x-foo removed', this);

                rivets.unbind(this.__view__);
            },
            attributeChanged: function(attr, value){
                console.log('x-foo attributeChanged', this, attr, value);
            },
        },
    };

    return el;
});
