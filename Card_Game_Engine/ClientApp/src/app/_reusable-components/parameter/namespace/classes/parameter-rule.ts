export class ParameterRule {
  parameter: number;
  cannotBeUsedWith: number[];
  canDuplicate: boolean;

  constructor(parameter: number, cannotBeUsedWith: number[], canDuplicate: boolean = false) {
    this.parameter = parameter;
    this.cannotBeUsedWith = cannotBeUsedWith;
    this.canDuplicate = canDuplicate;
  }
}
