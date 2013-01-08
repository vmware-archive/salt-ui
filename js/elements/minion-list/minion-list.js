/**
Two custom tags that comprise the currently available minion and details on
each.

@module saltui.elements
@submmodule minion-list
**/
define([
    'text!./template.html',
    'models/minions',
    'rivets',
    'underscore',
    ], function(template, minions, rivets, _) {
    'use strict';

    var minion_list = {
        onCreate: function(){
            var that = this;

            minions.then(function(result) {
                that.innerHTML = template;

                rivets.bind(that,
                    {minions: {minions: _.values(result)}, vm: that.xtag});
            });
        },
    };

    return minion_list;
});
