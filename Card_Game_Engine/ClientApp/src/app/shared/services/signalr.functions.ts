export function mirrorGrid(grid: any[], rows: number, columns: number): any[] {
  if (grid.length !== rows * columns) {
    throw new Error("Grid size doesn't match the given rows and columns");
  }

  const mirrored: number[] = new Array(rows * columns);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const oldIndex: number = i * columns + j;
      const newIndex: number = (rows - 1 - i) * columns + (columns - 1 - j);
      mirrored[newIndex] = grid[oldIndex];
    }
  }
  return mirrored;
}
