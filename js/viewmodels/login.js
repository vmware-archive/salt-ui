/**
Description
**/
define(function(require) {
    'use strict';

    var xhr = require('utils/xhr'),
        fireEvent = require('utils/events');

    var mixin = require('utils/mixin'),
        withInit = require('./mixins/withInit'),
        withAdvice = require('advice');

    var vm = mixin([withInit, withAdvice], {
        username: '',
        password: '',
        eauth: 'pam',

        inprogress: false,
        errormsg: '',

        submit: function(e) {
            e.preventDefault();

            var that = this;

            this.inprogress = true;
            this.errormsg = '';

            xhr('POST', '/login', {
                username: this.username,
                password: this.password,
                eauth: this.eauth})
            .then(
                function(result) {
                    that.username = '';
                    that.password = '';
                    fireEvent(e.target, 'x-login-authed', result);
                    window.history.back();
                },
                function (result) {
                    that.errormsg = result;
                }
            ).fin(function() {
                that.inprogress = false;
            }).done();
        },
    });

    return vm;
});
