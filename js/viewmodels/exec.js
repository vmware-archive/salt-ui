/**
Description
**/
define(function(require) {
    'use strict';

    var xhr = require('utils/xhr'),
        f = require('utils/func');

    var drawtree = require('elements/exec-results/tree');

    var vm = {
        client: 'local',
        tgt: '*',
        fun: '',
        arg: '',

        inprogress: false,
        result: null,

        /**
        Return the form fields values as a lowstate data structure
        **/
        lowstate: function() {
            return {
                client: this.client,
                tgt: this.tgt,
                fun: this.fun,
                arg: this.arg ? this.arg.split(' ') : [],
            };
        },

        /**
        Send the execution
        **/
        submit: function(e) {
            e.preventDefault();
            var that = this;

            this.inprogress = true;

            this.create_jid()
            .then(function() {
                that.inprogress = false;
            })
            .done();
        },

        /**
        Submit the execution form via Ajax and fire a custom notification
        with the job ID that is returned for other components to act on.

        @return {Promise}
        **/
        create_jid: function() {
            var that = this;

            this.result = null;

            return xhr('POST', '/minions', [this.lowstate()])
            .get(0).get('return')
            .then(function(result) {
                that.get_results(result.jid);
            });
        },

        /**
        Get the results from a job or retry a number of times if the job has
        not returned any results yet
        **/
        get_results: function(jid) {
            var that = this;
            var get_jid = f.applyLeft(xhr, 'GET', '/jobs/' + jid);

            return f.retry_promise(get_jid, 700, 20)
            .get('return').get(0)
            .then(function (result) {
                that.result = result;
                drawtree.updateTree(result);
            })
            .done();
        },
    };

    return vm;
});
