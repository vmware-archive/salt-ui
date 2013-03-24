/**

@module saltui.elements
@submmodule login
**/
define(function(require) {
    'use strict';

    var template = require('text!./template.html'),
        rivets = require('rivets'),
        routes = require('conf/routes'),
        xhr = require('utils/xhr'),
        xtag = require('x-tag');

    var login = {
        onCreate: function() {
            this.innerHTML = template;

            this.xtag.form_data = {
                username: '',
                password: '',
                eauth: 'pam',
            };

            rivets.bind(this, {login: this.xtag.form_data, vm: this.xtag});
        },
        events: {
            'submit:delegate(form)': function(e, el) {
                e.preventDefault();

                var that = this,
                    form_data = this.parentNode.xtag.form_data;

                el.hide_error();
                el.start_spinner();
                xhr('POST', '/login', form_data)
                .then(
                    function(result) {
                        xtag.fireEvent(that, 'x-login-authed', result);
                        window.location.hash = routes.get_url('exec'); },
                    function (result) {
                        el.show_error();
                    }
                ).fin(function(result) {
                       el.stop_spinner();
                }).done();
            },
        },
        methods: {
            start_spinner: function() {
                xtag.addClass(this.querySelector(".icon-spinner"), "icon-spin");
            },
            stop_spinner: function() {
                xtag.removeClass(this.querySelector(".icon-spinner"), "icon-spin");
            },
            show_error: function() {
                xtag.removeClass(this.querySelector(".text-error"), "hide");
            },
            hide_error: function() {
                xtag.addClass(this.querySelector(".text-error"), "hide");
            },
        }
    };

    return login;
});
