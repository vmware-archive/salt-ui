/**
The following is a collection of shims and polyfills

Augmenting default objects will be kept to a minimum in this project. Some are
shims for cutting-edge features that will be coming in ES6 or to future
browsers. Others are polyfills that fix current browser deficiencies (IE).
**/
define(function(require) {
    'use strict';

    require('./dataset');
    require('./string');
    require('./supplant');

    return null;
});
