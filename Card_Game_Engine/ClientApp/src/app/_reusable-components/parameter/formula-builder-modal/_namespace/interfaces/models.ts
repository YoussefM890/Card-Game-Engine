import {MethodEnum} from "../enums/method.enum";

export interface ParameterMetadata {
  name: string;
  type: string;
}

export interface MethodMetadata {
  id: MethodEnum;
  display: string;
  formulaDisplay: string;
  parameters: ParameterMetadata[];
  returnType: string;
}

export interface TypeMetadata {
  id: string;
  name: string;
  methods: MethodMetadata[];
}

export interface ChainModel {
  steps: StepModel[];
}

export interface StepModel {
  methodId: string;
  parameters: ParameterModel[];
  currentType: TypeMetadata;
}

export interface ParameterModel {
  mode: 'chain' | 'input';
  inputValue?: string;
  chain?: ChainModel;
  metadata?: ParameterMetadata | null;
}
