/**
Utils to add routes, lookup routes, and start the route listener

@module saltui
@submodule utils.router

@example
    routes = Object.create(router);
    routes.add('myurl', {
        url: '#/myurl',
        tmpl: '<p>Hello world!</p>',
        type: 'full',
    });
    routes.listen();
    routes.get_url('myurl'); // '#/myurl'
    routes.reverse_url('#/myurl'); // 'myurl'
**/
define(function(require) {
    'use strict';

    var Path = require('path'),
        dom_ready = require('domReady');

    var router = {
        get_url: function(name) {
            return this[name].url;
        },
        reverse_url: function(path) {
            return Object.keys(this).filter(function(key) {
                return this[key].target === path;
            });
        },

        add: function(name, obj) {
            // Add the URL object to the mapping and register with Path
            this[name] = obj;

            switch (obj.type) {
                case 'full':
                    Path.map(obj.url).to(this.render_full.bind(obj));
                    break;
                case 'modal':
                    Path.map(obj.url).to(this.render_modal.bind(obj))
                    .exit(this.modal_hide);
                    break;
                default:
                    throw new Error("Unknown URL type");
            }
        },
        root: function(path) {
            Path.root(path);
        },
        not_found: function() {
            Path.rescue(function() { throw new Error("Path not found"); });
        },
        listen: function() {
            // Wait until the DOM is ready before setting up the route listener
            dom_ready(function() {
                Path.listen();
            });
        },

        render_full: function() {
            document.querySelector('body').innerHTML = this.tmpl;
        },
        render_modal: function() {
            var modal = document.createElement('x-modal');
            modal.setAttribute('overlay','');
            modal.innerHTML = this.tmpl;
            document.querySelector('body').appendChild(modal);
        },
        modal_hide: function() {
            var body = document.querySelector('body');
            body.removeChild(body.querySelector('x-modal'));
        },
    };

    return router;
});
