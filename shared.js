const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const keysPressed = {};

function fileLoaded(fileName) {
  console.log(fileName + " loaded");
}
fileLoaded("shared.js");

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("keydown", function(e) {
  keysPressed[e.code] = true;
});

document.addEventListener("keyup", function(e) {
  keysPressed[e.code] = false;
});
