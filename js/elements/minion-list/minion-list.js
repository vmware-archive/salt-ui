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
    'underscore'
    ], function(template, minions, rivets, _) {
    'use strict';

    var minion_list = {
        onCreate: function(){
            var that = this;
            // Sync the list of minions every 30s
            window.setInterval(function() {minions.sync(); },30000);

            minions.get_result()
                .then(function(result) {
                    that.innerHTML = template;
                    rivets.bind(that,{minions: minions, vm: that.xtag});
                }).done();
        }
    };

    return minion_list;
});
