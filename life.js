fileLoaded("life.js");

let grid = [];
let spaceHold = -1;
let generation = 0;
const DEFAULT_PATTERN = null;
let currPattern = DEFAULT_PATTERN;
const spaceRate = 100;

const cellSize = 10;

for(let x = 0; x < Math.floor(canvas.width / cellSize); x++) {
  grid.push([]);
  for(let y = 0; y < Math.floor(canvas.height / cellSize); y++) {
    grid[x].push(false);
  }
}

function drawGrid() {
  clearCanvas();
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      if(grid[x][y]) ctx.fillStyle = 'black';
      else ctx.fillStyle = 'white';
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }

  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText("Generation: " + generation, 10, 50);
  ctx.fillText("Press t to insert a pattern", 10, 100);
}

document.addEventListener("keydown", function(e) {
  if(e.code == 'KeyT') {
    let pattern = prompt("Pattern? Check console for list of patterns", "glider");
    currPattern = PATTERNS[pattern];
  }
});

document.addEventListener("mousedown", function(e) {
  if(currPattern != null) {
    /*
     * Given cellSize = 10:
     * x,y = (3, 5): 0,0
     */
     for(let i = 0; i < currPattern.length; i++) {
       const patX = currPattern[i][0];
       const patY = currPattern[i][1];
       const x = Math.floor(e.offsetX / cellSize) + patX;
       const y = Math.floor(e.offsetY / cellSize) + patY;
       grid[x][y] = true;
     }
     drawGrid();
     currPattern = null;
  } else {
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);
    grid[x][y] = !grid[x][y];
    drawGrid();
  }
});

document.addEventListener("keyup", function(e) {
  if(e.code == 'Space') {
    spaceHold = -1;
    step();
    drawGrid();
  }
});

document.addEventListener("keydown", function(e) {
  if(e.code == 'Space') {
    if(spaceHold == -1) {
      spaceHold = Date.now();
    }
  }
});

const spaceHoldInterval = setInterval(function(){
  if(keysPressed['Space']) {
    if(spaceHold != -1) {
      const now = Date.now();
      const delta = now - spaceHold;
      const steps = Math.floor(delta / spaceRate);
      for(let i = 0; i < steps; i++) {
        step();
        drawGrid();
      }
      spaceHold += steps * spaceRate;
    }
  }
}, 100);

function gridIndex(x, y) {
  x = mod(x, grid.length);
  y = mod(y, grid[x].length);
  return grid[x][y];
}

function liveNeighborCount(x, y) {
  // from top-left, going clockwise
  let alive = 0;
  if(gridIndex(x - 1, y - 1)) alive += 1; // top left
  if(gridIndex(x, y - 1)) alive += 1; // top
  if(gridIndex(x + 1, y - 1)) alive += 1; // top right
  if(gridIndex(x + 1, y)) alive += 1; // right
  if(gridIndex(x + 1, y + 1)) alive += 1; // bottom right
  if(gridIndex(x, y + 1)) alive += 1; // bottom
  if(gridIndex(x - 1, y + 1)) alive += 1; // bottom left
  if(gridIndex(x - 1, y)) alive += 1; // left;

  return alive;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function step() {
  const next = JSON.parse(JSON.stringify(grid));
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid[x].length; y++) {
      const neighbors = liveNeighborCount(x, y);
      if(grid[x][y]) {
        if(neighbors < 2) {
          // underpop
          next[x][y] = false;
        } else if(neighbors > 3) {
          next[x][y] = false;
        }
      } else if(neighbors == 3){
        next[x][y] = true;
      }
    }
  }

  grid = next;
  generation += 1;
}

drawGrid();
