export class SelectOption {
  value: any;
  display: string;
  description?: string;

  constructor(value: any, display: string, description?: string) {
    this.value = value;
    this.display = display;
    this.description = description;
  }
}
