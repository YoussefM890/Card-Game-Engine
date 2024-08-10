export function generateGridDimensionsFromHeight(
  cols: number,
  rows: number,
  height: number = 0.8,
  widthToHeightRatio: number = 1.25,
  maxWidth: number = 0.8,
  heightOffset: number = 0,// height offset percentage
  widthOffset: number = 0 // width offset percentage
) {
  const screenHeight = document.documentElement.clientHeight;
  const screenWidth = document.documentElement.clientWidth;

  const gridHeight = screenHeight * height;
  const cellHeight = gridHeight / rows;
  const gridWidth = Math.min(cellHeight / widthToHeightRatio * cols, screenWidth * maxWidth);

  // Calculate offsets in pixels
  const widthOffsetPixels = screenWidth * (widthOffset);
  const heightOffsetPixels = screenHeight * (heightOffset);

  return {
    width: gridWidth + 'px',
    height: gridHeight + 'px',
    transform: `translate(${widthOffsetPixels}px, ${heightOffsetPixels}px)` // Apply the offsets
  };
}

export function generateGridDimensionsFromWidth(
  cols: number,
  rows: number,
  width: number,
  widthToHeightRatio: number = 1.25,
  maxHeight: number = 1,
  widthOffset: number = 0, // width offset percentage
  heightOffset: number = 0 // height offset percentage
) {
  const screenHeight = document.documentElement.clientHeight;
  const screenWidth = document.documentElement.clientWidth;

  const gridWidth = screenWidth * (width / 100);
  const cellWidth = gridWidth / cols;
  const gridHeight = Math.min(cellWidth * widthToHeightRatio * rows, screenHeight * maxHeight);

  // Calculate offsets in pixels
  const widthOffsetPixels = screenWidth * (widthOffset / 100);
  const heightOffsetPixels = screenHeight * (heightOffset / 100);

  return {
    width: gridWidth + 'px',
    height: gridHeight + 'px',
    transform: `translate(${widthOffsetPixels}px, ${heightOffsetPixels}px)` // Apply the offsets
  };
}
