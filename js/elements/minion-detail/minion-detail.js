/**
Output an element containing the id of a minion that when clicked will open a
modal with the details of that minion.

@module saltui.elements
@submmodule minion-detail

@example
    <x-minion-detail data-mid="dave"></x-minion-detail>
**/
define([
    'text!./template.html',
    'models/minions',
    'rivets'
    ], function(template, minions, rivets) {
    'use strict';

    var minion_detail = {
        methods: {
            detail: function() {
                var frag = document.createDocumentFragment(),
                    modal = document.createElement('x-modal');

                modal.innerHTML = template;
                modal.setAttribute('overlay','');
                modal.setAttribute('esc-hide','');
                rivets.bind(modal,
                    {minion: minions.getMinion(this.dataset.mid), vm: this.xtag});

                frag.appendChild(modal);
                document.body.appendChild(frag);
            }
        },
        events: {
            click: function() {
                this.detail();
            }
        }
    };

    return minion_detail;
});
