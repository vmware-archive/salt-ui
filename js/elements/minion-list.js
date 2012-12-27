/**
Two custom tags that comprise the currently available minion and details on
each.

@module saltui.elements
@submmodule minion-list
**/
define(['text!tmpl/minion-list.html', 'models/minions', 'rivets', 'underscore', 'x-tag'],
        function(template, minions, rivets, _, xtag) {
    'use strict';

    xtag.register('x-minion', {
        events: {
            click: function(){
                console.debug("clicked on minion", this.dataset.mid);
                this.open();
            }
        },
        methods: {
            open: function() {
                console.debug('open minion popup for', this.dataset.mid);
            }
        }
    });

    xtag.register('x-minion-list', {
        onCreate: function(){
            var that = this;

            minions.then(function(result) {
                that.innerHTML = template;

                rivets.bind(that,
                    {minions: {minions: _.values(result)}, vm: that.xtag});
            });
        },
        onInsert: function(){
        }
    });

    return null;
});
