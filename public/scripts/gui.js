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