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

            // Bail out if we can't find the specified model
            if (!model || !model.get_result) {
                throw new Error('Model not found:', this);
            }

            // Resync the model if the user (re-)auths
            document.addEventListener('x-login-authed', function() {
                model.sync();
            });

            model.get_result().then(function(result) {
                rivets.bind(that, {
                    xelem: that,
                    model: model,
                    result: result,
                    vm: that.xtag,
                });
            }).done();
        },
    };

    return datamodel;
});
