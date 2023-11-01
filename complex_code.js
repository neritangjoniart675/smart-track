// complex_code.js

// This code generates a maze using the Depth-First Search algorithm
// and allows the user to navigate through the maze using arrow keys.

const canvas = document.getElementById('maze');
const ctx = canvas.getContext('2d');

const width = 800;
const height = 600;
const cellSize = 20;
const cols = Math.floor(width / cellSize);
const rows = Math.floor(height / cellSize);

let grid = [];
let stack = [];
let current;

function setup() {
  canvas.width = width;
  canvas.height = height;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (const cell of grid) {
    cell.show();
  }

  current.visited = true;
  current.highlight();

  const next = current.getRandomNeighbor();
  if (next) {
    next.visited = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  requestAnimationFrame(draw);
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  show() {
    const x = this.i * cellSize;
    const y = this.j * cellSize;

    ctx.strokeStyle = 'white';
    ctx.beginPath();
    if (this.walls[0]) {
      ctx.moveTo(x, y);
      ctx.lineTo(x + cellSize, y);
    }
    if (this.walls[1]) {
      ctx.moveTo(x + cellSize, y);
      ctx.lineTo(x + cellSize, y + cellSize);
    }
    if (this.walls[2]) {
      ctx.moveTo(x + cellSize, y + cellSize);
      ctx.lineTo(x, y + cellSize);
    }
    if (this.walls[3]) {
      ctx.moveTo(x, y + cellSize);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    if (this.visited) {
      ctx.fillStyle = 'gray';
      ctx.fillRect(x, y, cellSize, cellSize);
    }
  }

  highlight() {
    const x = this.i * cellSize;
    const y = this.j * cellSize;

    ctx.fillStyle = 'yellow';
    ctx.fillRect(x, y, cellSize, cellSize);
  }

  getRandomNeighbor() {
    const neighbors = [];

    const top = grid[index(this.i, this.j - 1)];
    const right = grid[index(this.i + 1, this.j)];
    const bottom = grid[index(this.i, this.j + 1)];
    const left = grid[index(this.i - 1, this.j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      const randomIndex = Math.floor(Math.random() * neighbors.length);
      return neighbors[randomIndex];
    } else {
      return undefined;
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i >= cols || j >= rows) {
    return -1;
  }

  return i + (j * cols);
}

function removeWalls(a, b) {
  const x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  const y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function handleKey(event) {
  const { key } = event;

  let next;
  if (key === 'ArrowUp') {
    next = grid[index(current.i, current.j - 1)];
  } else if (key === 'ArrowRight') {
    next = grid[index(current.i + 1, current.j)];
  } else if (key === 'ArrowDown') {
    next = grid[index(current.i, current.j + 1)];
  } else if (key === 'ArrowLeft') {
    next = grid[index(current.i - 1, current.j)];
  }

  if (next && !current.walls.includes(true)) {
    current = next;
  }
}

document.addEventListener('keydown', handleKey);

setup();
draw();