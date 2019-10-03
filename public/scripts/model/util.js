var winMouseX;
var winMouseY;
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}
setInterval("onmousemove", 1000);

function angleTowardsMouse () {
  const dx = winMouseX - 1000 / 2
  const dy = winMouseY - 1000 / 2
  const angle = Math.atan2(dy, dx)

  return angle
}