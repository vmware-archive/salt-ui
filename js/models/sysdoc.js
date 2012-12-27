/**
All execution modules and the inline docs for each function therein

@module saltui.models
@submmodule sysdoc
**/
define(['utils/xhr', 'underscore'], function(xhr, _) {
    'use strict';

    var sysdoc = xhr('POST', '/', [{client: 'runner', fun: 'sys.doc'}])
    .get('return').get(0).then(function(result) {
        // reformat response into nested objects: {mod: {func: docs}}
        var i = {};
        _.each(result, function(value, key) {
            var name = key.split('.');
            i[name[0]] = i[name[0]] || {};
            i[name[0]][name[1]] = value;
        });

        return i;
    });

    return sysdoc;
});
