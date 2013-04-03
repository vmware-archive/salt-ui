/**
supplant() does variable substitution on the string. It scans through the
string looking for expressions enclosed in { } braces. If an expression is
found, use it as a key on the object, and if the key has a string value or
number value, it is substituted for the bracket expression and it repeats.

Although this is not coming in ES6, I really, really like it.  o_O

http://javascript.crockford.com/remedial.html

@example
param = {domain: 'valvion.com', media: 'http://media.valvion.com/'};
url = "{media}logo.gif".supplant(param);
**/
define(function() {
    'use strict';

    if (typeof String.prototype.supplant !== 'function') {
        String.prototype.supplant = function (o) {
            return this.replace(/{([^{}]*)}/g,
                function (a, b) {
                    var r = o[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        };
    }

    return null;
});
