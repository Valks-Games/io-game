class UI {

    // Initialize UI components
    static initialize() {
        Chat.createChat()
    }

    // Create a draggable UI container with header
    static createContainer(key) {
        var container = document.createElement("DIV");
        var header = document.createElement("DIV");
        var content = document.createElement("DIV");

        container.className = "UIContainer"
        content.id = key + "Container"

        header.className = "header"
        header.id = "header"

        content.className = "content"
        content.id = key + "Box"

        container.appendChild(header)

        container.appendChild(content)

        UI.dragElement(container);
        return new Container(container, content)
    }

    // Set an UI element to be draggable
    static dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (elmnt.childNodes[0].id == "header") {
            /* if present, the header is where you move the DIV from:*/
            elmnt.childNodes[0].onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            elmnt.style.bottom = ""
            elmnt.style.right = ""
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

class Container {
    constructor(_self, _child) {
        this.self = _self
        this.child = _child
    }
}