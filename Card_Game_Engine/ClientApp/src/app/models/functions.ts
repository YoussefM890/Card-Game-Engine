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
export function enumToList<T>(enumVariable: T): { key: string; value: string | number }[] {
  const keys = Object.keys(enumVariable).filter((key) => isNaN(Number(key)));

  const list: { key: string; value: string | number }[] = keys.reduce((acc, key) => {
    const value = enumVariable[key as keyof typeof enumVariable];
    if (isStringOrNumber(value)) {
      acc.push({ key, value });
    }
    return acc;
  }, [] as { key: string; value: string | number }[]);

  return list;
}
export function ListToObject(list : any[],attr: string) {
  return list.reduce((acc, cur) => {
    acc[cur[attr]] = cur;
    return acc;
  }, {});
}

export function getEnumKeys<T>(enumType: T): string[] {
  return Object.keys(enumType).filter(key => isNaN(Number(key)));
}

export function getEnumValues<T>(enumObj: T): string[] {
  return Object.keys(enumObj)
    .map(key => enumObj[key])
    .filter(value => typeof value === 'string'); // Adjust this line if your enum values are not strings
}

function isStringOrNumber(value: any): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}
