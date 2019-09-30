function play() {
  const menu = document.getElementById('menu');
  if (menu.style.display === 'none') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
    game.creatingPlayer = true;
    game.playerName = document.getElementById('playerName').value;
  }
}

function displayMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'block';
}

function toggleChat() {
  const chat = document.getElementById('chat');
  if (chat.style.display === 'none') {
    chat.style.display = 'block';
    chat.focus();
  } else {
    chat.style.display = 'none';
  }
}

function isChatHidden() {
  return document.getElementById('chat').style.display === 'none';
}

function getChatText() {
  return document.getElementById('chat').value;
}

function resetChat() {
  document.getElementById('chat').value = '';
}

function getURL() {
  return window.location.href;
}