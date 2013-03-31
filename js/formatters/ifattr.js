/**
Return the input as an array

@module saltui.formatters
@submodule array
**/
define(function() {
    'use strict';

    function ifattr(arr, attr) {
        return arr.filter(function(obj) {
            return obj[attr] !== null && obj[attr] !== undefined;
        });
    }

    return ifattr;
});
