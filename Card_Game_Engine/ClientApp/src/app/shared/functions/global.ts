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

/**
 * Replaces all controls in the given FormArray with new ones built from the provided array.
 * Ensures that valueChanges only emits once by suppressing intermediate emissions.
 * Useful for resetting or reloading the form without triggering multiple change events.
 *
 * @param formArray - The FormArray to update.
 * @param arrayValue - The new values to populate the FormArray with.
 */
export function recreateFormArray(formArray: FormArray, arrayValue: any[]) {
  const controls = arrayValue.map(value => {
    const group: Record<string, FormControl> = {};
    Object.keys(value).forEach(key => {
      group[key] = new FormControl(value[key]);
    });
    return new FormGroup(group);
  });

  formArray.clear({emitEvent: false});
  controls.forEach(control => formArray.push(control, {emitEvent: false}));
  formArray.updateValueAndValidity({emitEvent: true});
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


/**
 * Splits an input string into tokens while respecting nested delimiters.
 *
 * @param {string} input - The input string to be tokenized.
 * @param {string} open - The opening character that increases depth (e.g., `(`, `{`, `[`).
 * @param {string} close - The closing character that decreases depth (e.g., `)`, `}`, `]`).
 * @param {string} separator - The character used to split tokens at depth level 0.
 * @returns {string[]} - An array of tokens extracted from the input string.
 *
 * The function iterates through the input string and:
 * - Splits at the `separator` only if it is at **depth level 0** (not inside nested brackets).
 * - Increments `depth` when encountering an `open` character.
 * - Decrements `depth` when encountering a `close` character.
 * - Collects characters into a token until a valid split point is reached.
 * - Returns an array of extracted tokens.
 *
 */
export function tokenize(input: string, open: string, close: string, separator: string): string[] {
  const tokens: string[] = [];
  let token = '';
  let depth = 0;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === separator && depth === 0) {
      tokens.push(token);
      token = '';
      continue;
    }
    token += c;
    if (c === open) {
      depth++;
    } else if (c === close) {
      depth--;
    }
  }
  tokens.push(token);
  return tokens;
}

/**
 * Trims specified characters from both the start and end of the given string.
 *
 * @param {string} str - The input string to be trimmed.
 * @param {string[]} chars - An array of characters to remove from both ends.
 * @returns {string} - The trimmed string with specified characters removed from the edges.
 *
 */
export function trim(str: string, chars: string[]): string {
  if (!str) return str; // Handle empty string edge case
  const charSet = new Set(chars); // Use a Set for O(1) lookup

  let start = 0, end = str.length - 1;

  while (start <= end && charSet.has(str[start])) {
    start++;
  }

  while (end >= start && charSet.has(str[end])) {
    end--;
  }

  return str.slice(start, end + 1);
}
