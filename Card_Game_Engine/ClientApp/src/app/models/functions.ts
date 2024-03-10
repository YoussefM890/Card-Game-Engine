export function linkAndAggregate<T extends Record<string, any>, U extends Record<string, any>>(
  listX: T[],
  listY: U[],
  matchingPropertyX: keyof T,
  matchingPropertyY: keyof U,
  targetPropertyX: keyof T
): T[] {
  return listX.map(itemX => {
    const aggregatedItems = listY.filter(itemY => itemY[matchingPropertyY] as unknown === itemX[matchingPropertyX]);
    return { ...itemX, [targetPropertyX]: aggregatedItems };
  });
}
