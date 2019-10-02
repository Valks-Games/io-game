function play () {
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

function displayMenu () {
  const menu = document.getElementById('menu')
  menu.style.display = 'block'
}

function toggleChat () {
  const chat = document.getElementById('chat')
  if (isChatHidden()) {
    chat.focus()
  } else {
    chat.blur()
  }
}

function isChatHidden () {
  return document.activeElement !== chat
}

function getChatText () {
  return document.getElementById('chat').value
}

function resetChat () {
  document.getElementById('chat').value = ''
}

function getURL () {
  return window.location.href
}
