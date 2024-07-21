export function generateGridDimensions(
  rows: number,
  cols: number,
  height: number = 0.8,
  width: number = null,
  widthToHeightRatio: number = 1.25,
  maxWidth: number = 0.8,
  maxHeight: number = 1,
) {
  const screenHeight = document.documentElement.clientHeight;
  const screenWidth = document.documentElement.clientWidth;

  let gridWidth: number;
  let gridHeight: number;

  if (width !== null) {
    gridWidth = screenWidth * (width / 100);
    const cellWidth = gridWidth / cols;
    gridHeight = Math.min(cellWidth * widthToHeightRatio * rows, screenHeight * maxHeight);
  } else {
    gridHeight = screenHeight * height;
    const cellHeight = gridHeight / rows;
    gridWidth = Math.min(cellHeight / widthToHeightRatio * cols, screenWidth * maxWidth);
  }

  return {
    width: gridWidth + 'px',
    height: gridHeight + 'px'
  }
}
