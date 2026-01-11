// Mirror grid for Top perspective (180° rotation)
export function mirrorGrid(grid: any[], rows: number, columns: number): any[] {
  if (grid.length !== rows * columns) {
    throw new Error("Grid size doesn't match the given rows and columns");
  }

  const mirrored: any[] = new Array(rows * columns);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const oldIndex: number = i * columns + j;
      const newIndex: number = (rows - 1 - i) * columns + (columns - 1 - j);
      mirrored[newIndex] = grid[oldIndex];
    }
  }
  return mirrored;
}

// Rotate grid 90° counter-clockwise for Left perspective
export function rotateGridLeft(grid: any[], rows: number, columns: number): any[] {
  if (grid.length !== rows * columns) {
    throw new Error("Grid size doesn't match the given rows and columns");
  }

  const rotated: any[] = new Array(rows * columns);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const oldIndex: number = i * columns + j;
      // New position: column becomes row (from right), row becomes column
      const newRow: number = columns - 1 - j;
      const newCol: number = i;
      const newIndex: number = newRow * rows + newCol;
      rotated[newIndex] = grid[oldIndex];
    }
  }
  return rotated;
}

// Rotate grid 90° clockwise for Right perspective
export function rotateGridRight(grid: any[], rows: number, columns: number): any[] {
  if (grid.length !== rows * columns) {
    throw new Error("Grid size doesn't match the given rows and columns");
  }

  const rotated: any[] = new Array(rows * columns);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const oldIndex: number = i * columns + j;
      // New position: column becomes row, row becomes column (from bottom)
      const newRow: number = j;
      const newCol: number = rows - 1 - i;
      const newIndex: number = newRow * rows + newCol;
      rotated[newIndex] = grid[oldIndex];
    }
  }
  return rotated;
}

// Rotate grid 90° clockwise, repeated `times` times (0-3)
// Returns { grid, rows, columns } with updated dimensions
export function rotateGrid(
  grid: any[],
  rows: number,
  columns: number,
  times: number = 1
): { grid: any[], rows: number, columns: number } {
  const rotations = ((times % 4) + 4) % 4; // Normalize to 0-3, handles negatives

  if (rotations === 0) return {grid: [...grid], rows, columns}; // Return copy, no rotation

  let result = grid;
  let currentRows = rows;
  let currentCols = columns;

  for (let r = 0; r < rotations; r++) {
    // After 90° rotation, dimensions swap
    const newRows = currentCols;
    const newCols = currentRows;
    const rotated: any[] = new Array(newRows * newCols);

    for (let i = 0; i < currentRows; i++) {
      for (let j = 0; j < currentCols; j++) {
        const oldIndex = i * currentCols + j;
        // 90° clockwise: (i, j) -> (j, currentRows - 1 - i)
        const newRow = j;
        const newCol = currentRows - 1 - i;
        const newIndex = newRow * newCols + newCol;
        rotated[newIndex] = result[oldIndex];
      }
    }

    result = rotated;
    currentRows = newRows;
    currentCols = newCols;
  }

  return {grid: result, rows: currentRows, columns: currentCols};
}
