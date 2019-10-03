function play() {
  const menu = document.getElementById('menu')
  const chatBox = document.getElementById('chatBox')
  if (menu.style.display === 'none') {
    menu.style.display = 'block'
    chatBox.style.display = 'none'
  } else {
    menu.style.display = 'none'
    chatBox.style.display = 'block'
    game.creatingPlayer = true
    game.playerName = document.getElementById('playerName').value
  }
}

function displayMenu() {
  const menu = document.getElementById('menu')
  menu.style.display = 'block'
}

function toggleChat() {
  const chat = document.getElementById('chat')
  if (!Chat.isChatFocused()) {
    chat.focus()
  } else {
    chat.blur()
  }
}

function getURL() {
  return window.location.href
}

// Chat resize event
$(document).ready(function () {
  var history = jQuery('#history');

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