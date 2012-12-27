/**
Minions and the grains for each

@module saltui.models
@submmodule minions
**/
define(['utils/xhr'], function(xhr) {
    'use strict';

    var grains = xhr('POST', '/',
            [{client: 'local', tgt: '*', fun: 'grains.items'}]);

    return grains.get('return').get(0);
});
