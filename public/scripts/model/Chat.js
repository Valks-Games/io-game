const HTMLClasses = {
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
    static logChatMessage(message, jumpLine = true, forceUpdate = false) {
        const history = Chat.getElement(HTMLClasses.history)

        // Check if user is with chat scrolled to bottom
        var canUpdate = Chat.canUpdate()

        history.value += `${jumpLine ? "\n" : ""}${message}`;

        // If is at the bottom of the scroll, auto update the chat
        if (canUpdate || forceUpdate) {
            history.scrollTop = history.scrollHeight
        }
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

    // Check if chat text input is focused
    static isChatFocused() {
        return document.activeElement !== Chat.getElement(HTMLClasses.input)
    }

    // Get chat text input text
    static getInputText() {
        return Chat.getElement(HTMLClasses.input).value
    }

    // Resets chat text input text
    static resetInput() {
        Chat.getElement(HTMLClasses.input).value = ''
    }
}