/**
A custom element to execute Salt modules via salt-api

@module saltui.elements
@submmodule execution

@event SaltExecution
@param {String} jid The job ID from an execution
**/
define(['text!tmpl/execution.html', 'models/sysdoc', 'rivets', 'underscore', 'x-tag'],
        function(template, sysdoc, rivets, _, xtag) {
    'use strict';

    xtag.register('x-execution', {
        onInsert: function(){
            var that = this;

            sysdoc.then(function(result) {
                that.innerHTML = template;

                rivets.bind(that.querySelector('datalist'),
                    {funs: {funs: _.keys(result).sort()}, vm: that.xtag});
            });
        },
        events: {
            submit: function(e){
                e.preventDefault();
                console.debug('submitted form!');
            }
        }
    });

    return null;
});
