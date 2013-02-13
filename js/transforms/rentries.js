/**
Convert an arbitrarily deep object to arrays of key/value pairs.
(A recursive version of d3.entries().)

@module saltui.transforms
@submodule rentries

@param {Object} obj A (possibly nested) object of keys and values
@returns {Array}

@example
    var myobj = {foo: 'foo!', bar: {baz: 'baz!', qux: 'qux!'}};
    rentries(myobj)
    // => [
    //  {"key": "foo", "value": "foo!"},
    //  {"key": "bar", "value": [
    //      {"key": "baz", "value": "baz!"},
    //      {"key": "qux", "value": "qux!"}
    //  ]}
    // ]
**/
define(function() {
    'use strict';

    function rentries(obj) {
        if (obj !== Object(obj)) return obj;

        return Object.keys(obj).map(function(key) {
            var val = obj[key];
            return {
                key: key,
                value: typeof(val) === 'object' ? rentries(val) : val,
            };
        });
    }

    return rentries;
});
