/**
A custom X-Tag mixin for setting up two-way data binding (via Rivets) between
the custom X-Tag element and the model specified as an attribute on the tag.

@example
    <x-my-tag data-model="mymodel"></x-my-tag>
**/
define(['models/init', 'rivets'], function(models, rivets) {
    'use strict';

    var datamodel = {
        onCreate: function() {
            var that = this,
                model = models[this.dataset.model];

            // Bail out if we can't find the specified model or the returned
            // model is not a promise
            if (!model || !model.then) {
                console.error('Model not found:', this);
                return null;
            }

            if (!this.get_template) {
                console.error('Model does not have template attribute', this);
                return null;
            }

            model.then(function(result) {
                that.innerHTML = that.get_template();
                rivets.bind(that, {model: result, vm: that.xtag});
            });
        },
    };

    return datamodel;
});

