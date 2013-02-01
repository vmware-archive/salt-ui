/**
Return the input as an array

@module saltui.formatters
@submodule array
**/
define(function() {
    'use strict';

    var array = function(value) {
        if (typeof(value) === 'object') {
            return Object.keys(value).map(function(key){ return value[key]; });
        }
        if (!value.length) {
            return [value];
        }
        return value;
    };

    return array;
});
