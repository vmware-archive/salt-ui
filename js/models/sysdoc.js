/**
All execution modules and the inline docs for each function therein

@module saltui.models
@submmodule sysdoc
**/
define(function(require) {
    'use strict';

    var withCachedSync = require('./mixins/withCachedSync');

    function Sysdoc() {
        this.lowstate = [{client: 'runner', fun: 'doc.execution'}];

        this.update = function(result) {
            return this.format_ret(result['return'][0]);
        };

        /**
        Reformat {'mod.func': docs} into nested objects: {mod: {func: docs}}
        **/
        this.format_ret = function(docs_obj) {
            var i = {};

            Object.keys(docs_obj).forEach(function(key) {
                var name = key.split('.');

                i[name[0]] = i[name[0]] || {};
                i[name[0]][name[1]] = docs_obj[key];
            });

            return i;
        };
    }

    /**
    Apply mixins
    **/
    withCachedSync.call(Sysdoc.prototype);

    return new Sysdoc();
});
