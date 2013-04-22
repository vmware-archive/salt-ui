/**
A function to fire a custom event

We're using the one bundled with the document.register() polyfill for now.

@param {Element} target_element
@param {String} event_name
@param {Function} callback
**/
define(function() {
    'use strict';
    return document.register.__polyfill__.fireEvent;
});
