/**
A formatter that returns the length property of an object

@module saltui.formatters
@submodule length

@example
    <p>Number of tags: <span data-text="item.tags | length"></span></p>
**/
define(function() {
    'use strict';

    var length = function(value) {
        return value.length;
    };

    return length;
});
