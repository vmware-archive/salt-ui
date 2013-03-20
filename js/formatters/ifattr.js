/**
Return the input as an array

@module saltui.formatters
@submodule array
**/
define(function() {
    'use strict';

    function isattr(arr, attr) {
        return arr.filter(function(obj) {
            return obj[attr] !== null && obj[attr] !== undefined;
        });
    }

    return isattr;
});
