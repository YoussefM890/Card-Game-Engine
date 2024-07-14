import {FormArray} from "@angular/forms";

export function getEnumKeys<T>(enumType: T): string[] {
  return Object.keys(enumType).filter(key => isNaN(Number(key)));
}

export function getEnumValues<T>(enumObj: T): string[] {
  return Object.keys(enumObj)
    .map(key => enumObj[key])
    .filter(value => typeof value === 'string'); // Adjust this line if your enum values are not strings
}

export function isStringOrNumber(value: any): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}

export function ListToObject(list: any[], attr: string) {
  return list.reduce((acc, cur) => {
    acc[cur[attr]] = cur;
    return acc;
  }, {});
}

export function filterDictBySize<K extends number | string, V>(dict: Record<K, V>, size: number): Record<K, V> {
  return Object.fromEntries(
    Object.entries(dict).filter(([key]) => Number(key) < size)
  ) as Record<K, V>;
}

export function clearFormArray(formArray: FormArray) {
  while (formArray.length) {
    formArray.removeAt(0);
  }
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}
