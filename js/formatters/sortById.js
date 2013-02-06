/**
 Return a sorted array

 @module saltui.formatters
 @submodule array
 **/
define(function() {
    'use strict';

    var sorted = function(value) {
        if (Array.isArray(value)) {
            console.log("sorting");
            return value.sort(
                function(a, b) {
                    var idA=a.id.toLowerCase(),
                        idB=b.id.toLowerCase();
                    if (idA < idB) //sort string ascending
                        return -1
                    if (idA > idB)
                        return 1
                    return 0 //default return value (no sorting)
                })
        } else {
        return value;
        }
    };

    return sorted;
});