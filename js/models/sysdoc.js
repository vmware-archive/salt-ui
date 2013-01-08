/**
All execution modules and the inline docs for each function therein

@module saltui.models
@submmodule sysdoc
**/
define(['utils/xhr', 'underscore'], function(xhr, _) {
    'use strict';

    /**
    A function to intelligently filter modules, functions, and docs from the
    sysdoc data structure
    **/
    var filter = function() {
        var modfunc,
            ret,
            list = this._list,
            filter_text = this._filter_text;

        // Short-circuit if nothing to filter by
        if (! filter_text) {
            return list;
        }

        modfunc = this._filter_text.split('.');

        if (modfunc.length === 2) {
            list = _.keys(this[modfunc[0]]).sort();
            filter_text = modfunc[1];

            // If we have identified a single function, short-circuit and
            // display the docs
            ret = this[modfunc[0]][modfunc[1]];

            if (ret) {
                return [ret];
            }
        } else {
            list = _.keys(this).sort();
        }

        return _.filter(list, function(val) {
            return val.search(filter_text) === 0;
        });
    };

    var sysdoc = xhr('POST', '/', [{client: 'runner', fun: 'sys.doc'}])
    .get('return').get(0).then(function(result) {
        // reformat response into nested objects: {mod: {func: docs}}
        var i = {};
        _.each(result, function(value, key) {
            var name = key.split('.');
            i[name[0]] = i[name[0]] || {};
            i[name[0]][name[1]] = value;
        });

        // Default list is module names
        i._list = _.keys(i).sort();
        i._filter_text = '';
        i._filter = filter.bind(i);
        return i;
    });

    return sysdoc;
});
