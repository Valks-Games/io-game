const HTMLClasses = {
    history: "history",
    input: "input"
}

const filters = ["nigger"]
const filterPlaceholder = "nyan"

// Chat UI component manager
class Chat {

    // Create chat component on HTML
    static createChat() {
        var container = UI.createContainer("chat")

        container.self.style.bottom = "2%"
        container.self.style.left = "2%"

        var history = document.createElement("TEXTAREA");
        var inputDiv = document.createElement("DIV");
        var input = document.createElement("INPUT");

        history.className = HTMLClasses.history
        history.id = HTMLClasses.history
        history.rows = 1
        history.readOnly = true

        inputDiv.className = HTMLClasses.input

        input.id = HTMLClasses.input
        input.type = "text"
        input.maxLength = 100

        inputDiv.appendChild(input)

        container.child.appendChild(history)
        container.child.appendChild(inputDiv)

        document.body.appendChild(container.self);
        Chat.setupResizeEvent()
    }

    // Return element from document
    static getElement(_class) {
        return document.getElementById(_class)
    }

    // Log message to user chat
    static logChatMessage(message, jumpLine = true, forceUpdate = false) {
        const history = Chat.getElement(HTMLClasses.history)

        // Check if user is with chat scrolled to bottom
        var canUpdate = Chat.canUpdate()

        history.value += `${jumpLine ? "\n" : ""}${message}`;

        // If is at the bottom of the scroll, auto update the chat
        if (canUpdate || forceUpdate) {
            Chat.scrollToBottom()
        }
    }

    // Filter a message
    static filterMessage(message) {
        var temp = message.split(" ")
        temp.map((word, i) => {
            if (filters.includes(word)) {
                temp[i] = filterPlaceholder
            }
        })
        return temp.join(" ")
    }

    // Check if user is with chat scrolled to bottom
    static canUpdate() {
        const history = Chat.getElement(HTMLClasses.history)
        var offset = history.getBoundingClientRect().height;
        if (history.scrollHeight <= (history.scrollTop + offset)) {
            // Scrolled to bottom
            return true
        } else {
            // Scrolled to top
            return false
        }
    }

    // Scroll chat history to bottom
    static scrollToBottom() {
        const history = Chat.getElement(HTMLClasses.history)
        history.scrollTop = history.scrollHeight
    }

    // Toggle between focus/defocus chat input
    static toggle() {
        if (Chat.isChatFocused()) {
            Chat.focus()
        } else {
            Chat.unfocus()
        }
    }

    // Focus chat input
    static focus() {
        Chat.getElement(HTMLClasses.input).focus()
    }

    // Defocus chat input
    static unfocus() {
        Chat.getElement(HTMLClasses.input).blur()
    }

    // Check if chat text input is focused
    static isChatFocused() {
        return document.activeElement !== Chat.getElement(HTMLClasses.input)
    }

    // Get chat text input text
    static getInputText() {
        return Chat.getElement(HTMLClasses.input).value
    }

    // Check if chat text input is empty
    static isInputEmpty() {
        return Chat.getInputText() == ''
    }

    // Resets chat text input text
    static resetInput() {
        Chat.getElement(HTMLClasses.input).value = ''
    }

    // Create an event for resize with jQuery
    static setupResizeEvent() {
        // Chat resize event
        jQuery(document).ready(function () {
            var history = jQuery(`#${HTMLClasses.history}`);

            // store init (default) state   
            history.data('x', history.outerWidth());
            history.data('y', history.outerHeight());

            history.mouseup(function () {

                var $this = jQuery(this);

                if ($this.outerWidth() != $this.data('x')
                    || $this.outerHeight() != $this.data('y')) {
                    // Resize Action Here
                    Chat.scrollToBottom()
                }

                // store new height/width
                $this.data('x', $this.outerWidth());
                $this.data('y', $this.outerHeight());
            });

        });
    }
}