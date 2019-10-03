function play() {
  UI.initialize()
  const menu = document.getElementById('menu')
  if (menu.style.display === 'none') {
    menu.style.display = 'block'
  } else {
    menu.style.display = 'none'
    game.creatingPlayer = true
    game.playerName = document.getElementById('playerName').value
  }
}

function displayMenu() {
  const menu = document.getElementById('menu')
  menu.style.display = 'block'
}

function getURL() {
  return window.location.href
}