const HTML_classes = {
    history: "history",
    input: "chat"
}

class Chat {
    constructor() { }

    // Return element from document
    static getElement(_class) {
        return document.getElementById(_class)
    }

    // Log message to user chat
    static logChatMessage(message, jumpLine = true) {
        const history = Chat.getElement(HTML_classes.history)

        // Check if user is with chat scrolled to bottom
        var canUpdate = Chat.canUpdate()

        history.value += `${jumpLine ? "\n" : ""}${message}`;

        // If is at the bottom of the scroll, auto update the chat
        if (canUpdate) {
            history.scrollTop = history.scrollHeight
        }
    }

    // Check if user is with chat scrolled to bottom
    static canUpdate() {
        const history = Chat.getElement(HTML_classes.history)
        var offset = history.getBoundingClientRect().height;
        if (history.scrollHeight <= (history.scrollTop + offset)) {
            // Scrolled to bottom
            return true
        } else {
            // Scrolled to top
            return false
        }
    }

    // Check if chat text input is focused
    static isChatFocused() {
        return document.activeElement !== Chat.getElement(HTML_classes.input)
    }

    // Get chat text input text
    static getInputText() {
        return Chat.getElement(HTML_classes.input).value
    }

    // Resets chat text input text
    static resetInput() {
        Chat.getElement(HTML_classes.input).value = ''
    }
}