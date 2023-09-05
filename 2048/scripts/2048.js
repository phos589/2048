const grid = new Array(4).fill(null).map(() => new Array(4).fill(0));

function initializeGrid() {
  addRandomTile();
  addRandomTile();
  updateGridUI();
}
function handleKeyDown(event) {
  switch (event.key) {
    case "w":
      moveTilesUp();
      break;
    case "a":
      moveTilesLeft();
      break;
    case "s":
      moveTilesDown();
      break;
    case "d":
      moveTilesRight();
      break;
  }
  addRandomTile();
  updateGridUI();

}
function moveTilesLeft() {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 1; col < grid[row].length; col++) {
      if (grid[row][col] !== 0) {
        let currentCol = col;
        while (currentCol > 0 && grid[row][currentCol - 1] === 0) {
          grid[row][currentCol - 1] = grid[row][currentCol];
          grid[row][currentCol] = 0;
          currentCol--;
        }
        
        if (currentCol > 0 && grid[row][currentCol - 1] === grid[row][currentCol]) {
          grid[row][currentCol - 1] *= 2;
          grid[row][currentCol] = 0;
      
        }
      }
      
    }
  }
}
function moveTilesRight() {
  for (let row = 0; row < grid.length; row++) {
    for (let col = grid[row].length - 2; col >= 0; col--) {
      if (grid[row][col] !== 0) {
        let currentCol = col;
        while (currentCol < grid[row].length - 1 && grid[row][currentCol + 1] === 0) {
          grid[row][currentCol + 1] = grid[row][currentCol];
          grid[row][currentCol] = 0;
          currentCol++;
        }
        
        if (currentCol < grid[row].length - 1 && grid[row][currentCol + 1] === grid[row][currentCol]) {
          grid[row][currentCol + 1] *= 2;
          grid[row][currentCol] = 0;
      
        }
      }
    }
  }
}
function moveTilesDown() {
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = grid.length - 2; row >= 0; row--) {
      if (grid[row][col] !== 0) {
        let currentRow = row;
        while (currentRow < grid.length - 1 && grid[currentRow + 1][col] === 0) {
          grid[currentRow + 1][col] = grid[currentRow][col];
          grid[currentRow][col] = 0;
          currentRow++;
        }
        
        if (currentRow < grid.length - 1 && grid[currentRow + 1][col] === grid[currentRow][col]) {
          grid[currentRow + 1][col] *= 2;
          grid[currentRow][col] = 0;
        
        }
      }
    }
  }
}

function moveTilesUp() {
  for (let col = 0; col < grid[0].length; col++) {
    for (let row = 1; row < grid.length; row++) {
      if (grid[row][col] !== 0) {
        let currentRow = row;
        while (currentRow > 0 && grid[currentRow - 1][col] === 0) {
          grid[currentRow - 1][col] = grid[currentRow][col];
          grid[currentRow][col] = 0;
          currentRow--;
        }
        
        if (currentRow > 0 && grid[currentRow - 1][col] === grid[currentRow][col]) {
          grid[currentRow - 1][col] *= 2;
          grid[currentRow][col] = 0;
        }
      }
    }
  }
}

function addRandomTile() {
  const emptyCells = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
  }
}

function updateGridUI() {
  const gameContainer = document.querySelector(".game-container");
  gameContainer.innerHTML = "";

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const tileValue = grid[row][col];
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.textContent = tileValue !== 0 ? tileValue : "";

      tile.style.backgroundColor = getTileBackgroundColor(tileValue);

      tile.style.top = `${row * 100}px`;
      tile.style.left = `${col * 100}px`;

      gameContainer.appendChild(tile);

      tile.getBoundingClientRect();

      tile.classList.add("animate");
    }
  }
}


function getTileBackgroundColor(value) {

  const colorMap = {
    0: "#CDC1B4",   
    2: "#EEE4DA",
    4: "#EDE0C8",
    8: "#F2B179",
    16: "#F59563",
    32: "#F67C5F",
    64: "#F65E3B",
    128: "#EDCF72",
    256: "#EDCC61",
    512: "#EDC850",
    1024: "#EDC53F",
    2048: "#EDC22E",
  };


  return colorMap[value] || "#FF0000";
}

document.addEventListener("keydown", handleKeyDown);

initializeGrid();