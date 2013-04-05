/**
Description
**/
define(function() {
    'use strict';

    function keyval(value) {
        if (!value || typeof(value) !== 'object') return value;

        return Object.keys(value).map(function(key) {
            return {key: key, value: value[key]};
        });
    }

    return keyval;
});
