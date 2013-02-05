/**
 x-toggle-switch

 http://registry.x-tags.org/mozilla/x-tag-elements/toggle-switch
 **/
define(['x-tag'], function(xtag) {
    var onTextAttr = 'on-text';
    var offTextAttr = 'off-text';

    var buttonSelector = '.x-toggle-switch-button';
    var styleOffAttr = 'data-off';

    var toggle = {

        onCreate: function(){
            this.innerHTML = '<label>'+ (this.getAttribute('label') || this.getAttribute('input-name')) +'</label>' +
                '<div class="' + buttonSelector.substring(1) + '" ' +
                onTextAttr + '="' +this.onText + '" ' +
                offTextAttr + '="' +this.offText + '" >' +
                '<input type="hidden" name="'+ this.name +
                '" value="on" /></div>';
        },
        onInsert: function(){
            var value = this.getAttribute('initial-value'); //get initial value
            if (value && value == 'off'){
                this.setOff();
            }
        },
        events: {
            'click:delegate(.x-toggle-switch-button)': function(event, toggleSwitch) {
                event.preventDefault();

                if (!this.hasMouseBeenDragged) {
                    // don't toggle twice if drag + click
                    toggleSwitch.toggle();
                }
            },

            'mousedown:delegate(.x-toggle-switch-button)': function(event, toggleSwitch) {
                this.isMouseDown = true;

                if (this.hasMouseBeenDragged) {
                    this.hasMouseBeenDragged = false;
                }
            },

            'mouseup:delegate(.x-toggle-switch-button)': function(event, toggleSwitch) {
                this.isMouseDown = false;
            },

            'mousemove:delegate(.x-toggle-switch-button)': function(event, toggleSwitch) {
                if (this.isMouseDown && !this.hasMouseBeenDragged) {
                    // mouse is being dragged
                    event.preventDefault();
                    toggleSwitch.toggle();

                    // only trigger drag toggle once
                    this.hasMouseBeenDragged = true;
                }
            }
        },

        setters: {
            'onText:attribute(on-text)': function(onText) {
                this.querySelector(buttonSelector).setAttribute(onTextAttr, onText);
            },

            'offText:attribute(off-text)': function(offText) {
                this.querySelector(buttonSelector).setAttribute(offTextAttr, offText);
            },

            'inputName:attribute(input-name)': function(name){
                this.querySelector('input').name = name;
                this.querySelector('label').textContent = this.getAttribute('label') || name;
            },

            'label:attribute()': function(label){
                this.querySelector('label').textContent = label;
            }
        },

        getters: {
            onText: function() {
                return this.getAttribute(onTextAttr) || 'on';
            },

            offText: function() {
                return this.getAttribute(offTextAttr) || 'off';
            },

            inputName: function(){
                return this.querySelector('input').name;
            },

            label: function(){
                return this.querySelector('label').textContent;
            }

        },

        methods: {
            /**
             * Toggles this toggle switch, triggering an 'on' or 'off' event.
             */
            toggle: function() {
                var button = this.querySelector(buttonSelector);
                if (button.getAttribute(styleOffAttr)) {
                    this.setOn();
                    return 'on';
                } else {
                    this.setOff();
                    return 'off';
                }
            },

            setOn: function(){
                var button = this.querySelector(buttonSelector);
                button.removeAttribute(styleOffAttr);
                this.querySelector('input').value = 'on';
                xtag.fireEvent(this, 'on');
            },

            setOff: function(){
                var button = this.querySelector(buttonSelector);
                this.querySelector('input').value = 'off';
                button.setAttribute(styleOffAttr, 'true');
                xtag.fireEvent(this, 'off');
            }
        }
    };

    return toggle;
});