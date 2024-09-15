import {FormArray, FormControl, FormGroup} from "@angular/forms";

export function isNullUndefinedOrEmpty(value: any): boolean {
  return value === null || value === undefined || value === '';
}
export function getEnumKeys<T>(enumType: T): string[] {
  return Object.keys(enumType).filter(key => isNaN(Number(key)));
}

export function getEnumValues<T>(enumObj: T): string[] {
  return Object.keys(enumObj)
    .map(key => enumObj[key])
    .filter(value => typeof value === 'string');
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

export function recreateFormArray(formArray: FormArray, arrayValue: any[]) {
  clearFormArray(formArray);
  arrayValue.forEach(value => {
    const group = {};
    Object.keys(value).forEach(key => {
      group[key] = new FormControl(value[key]);
    });
    const control = new FormGroup(group);
    formArray.push(control);
  });
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

export function deepCopy<T = any>(obj: T): any {
  return JSON.parse(JSON.stringify(obj));
}

export function validateForm(form: any): boolean {
  let isValid = true;

  Object.keys(form.controls).forEach(field => {
    const control = form.get(field);
    if (control instanceof FormArray) {
      control.controls.forEach(c => {
        if (!validateForm(c)) {
          isValid = false;
        }
      });
    } else {
      control.markAsTouched({onlySelf: true});
      if (control.invalid) {
        isValid = false;
      }
    }
  });

  return isValid;
}

export function CsvToIntSet(csv: string): Set<number> {
  return new Set(
    csv
      .split(',')
      .map(str => str.trim())
      .filter(str => !isNaN(Number(str)) && Number.isInteger(parseFloat(str))) // Check for valid integers
      .map(str => parseInt(str, 10)) // Convert to integers
  );
}

export function setToCsv(set: Set<number | string>): string {
  return Array.from(set).join(',');
}

export function JsonToForm(json: any): FormGroup {
  const formGroup = new FormGroup({});

  Object.keys(json).forEach(key => {
    if (json[key] !== null && typeof json[key] === 'object' && !Array.isArray(json[key])) {
      formGroup.addControl(key, JsonToForm(json[key]));
    } else if (Array.isArray(json[key])) {
      const formArray = new FormArray(json[key].map((item: any) => {
        return typeof item === 'object' ? JsonToForm(item) : new FormControl(item);
      }));
      formGroup.addControl(key, formArray);
    } else {
      formGroup.addControl(key, new FormControl(json[key]));
    }
  });

  return formGroup;
}

export function removeFirstAndLast(arr: any[]): any[] {
  arr.shift();
  arr.pop();
  return arr;
}

