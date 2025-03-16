import {AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Component, Inject, OnInit} from "@angular/core";
import {MatTooltip} from "@angular/material/tooltip";
import {NgTemplateOutlet} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {clearFormArray, tokenize} from "../../../shared/functions/global";
import {allTypes, RootType} from "./_namespace/constants/types";
import {
  ChainModel,
  MethodMetadata,
  ParameterMetadata,
  ParameterModel,
  StepModel,
  TypeMetadata
} from "./_namespace/interfaces/models";

@Component({
  selector: 'app-formula-builder-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatTooltip,
    NgTemplateOutlet,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    MatButton
  ],
  templateUrl: './formula-builder-modal.component.html',
  styleUrl: './formula-builder-modal.component.scss'
})


export class FormulaBuilderModalComponent implements OnInit {

  formulaForm: FormGroup;
  types: TypeMetadata[] = allTypes;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<FormulaBuilderModalComponent>,
              private fb: FormBuilder
  ) {
  }

  // Helper getter for the chain FormArray
  get chainControl(): FormArray {
    return this.formulaForm.get('chain') as FormArray;
  }

  ngOnInit(): void {
    this.dialogRef.backdropClick().subscribe(() => {
      this.dialogRef.close(this.data.formula);
    });
    this.formulaForm = this.fb.group({
      chain: this.fb.array([])
    });
    if (this.data.formula) {
      const parsedChain = this.parseChain(this.data.formula.substring(2, this.data.formula.length - 2));
      this.formulaForm.setControl('chain', this.buildChainForm(parsedChain));
    } else {
      const chainArray = this.getFormArray(this.formulaForm, 'chain');
      this.addChainStep(chainArray, RootType);
    }
  }

  buildChainForm(chainData: ChainModel): FormArray {
    return this.fb.array(
      chainData.steps.map(step => this.buildStepForm(step))
    );
  }

  buildStepForm(step: StepModel): FormGroup {
    return this.fb.group({
      methodId: [step.methodId],
      currentType: [step.currentType],
      parameters: this.fb.array(
        step.parameters.map(param => this.buildParameterForm(param))
      )
    });
  }

  buildParameterForm(param: ParameterModel): FormGroup {
    return this.fb.group({
      mode: [param.mode],
      inputValue: [param.mode === 'input' ? param.inputValue : null],
      chain: param.mode === 'chain' && param.chain ? this.buildChainForm(param.chain) : this.fb.array([]),
      metadata: [param.metadata]
    });
  }

  parseChain(chainString: string, depth = 0, currentType = RootType): ChainModel {
    const chain: ChainModel = {steps: []};
    let currentMethod: MethodMetadata = null

    const tokens = tokenize(chainString, '(', ')', ';')
      .filter(t => t.trim().length > 0);

    tokens.forEach(token => {
      if (!token.startsWith("(")) {
        // 1) This is a "method id" token
        if (!currentType.methods.find(m => m.id === parseInt(token))) {
          throw new Error("Method not found For The type " + currentType.name + " with id " + token);
        }
        currentMethod = currentType.methods.find(m => m.id === parseInt(token));

        // Create a new step
        chain.steps.push({
          methodId: token,
          parameters: [],
          currentType: currentType
        });

        currentType = allTypes.find(t => t.id === currentMethod.returnType);


      } else {
        // 2) This is a parameter group
        const parameters = tokenize(token.substring(1, token.length - 1), '{', '}', ';')
          .filter(t => t.trim().length > 0);

        // Get the last step
        const previousStep = chain.steps[chain.steps.length - 1];

        if (!currentMethod) {
          throw new Error(`Something wrong with the chain string`);
        }
        if (currentMethod.parameters.length !== parameters.length) {
          throw new Error(`Number of parameters ${parameters.length} does not match the method ${currentMethod.display} definition ${currentMethod.parameters.length}`);
        }
        for (let i = 0; i < parameters.length; i++) {
          const paramValue = parameters[i];
          const isChain = paramValue.startsWith("{") && paramValue.endsWith("}");

          const parameter: ParameterModel = {
            mode: isChain ? 'chain' : 'input',
            metadata: currentMethod.parameters[i]
          };

          if (isChain) {
            // Recursively parse the chain inside the braces
            const nestedChainString = paramValue.substring(1, paramValue.length - 1);
            parameter.chain = this.parseChain(nestedChainString, depth + 1);
          } else {
            parameter.inputValue = paramValue;
          }

          previousStep.parameters.push(parameter);
        }
      }
    });
    // If the selected method’s return type can chain further, add a new chain step.
    const nextType = this.types.find(t => t.id === currentMethod.returnType);
    if (nextType && nextType.methods && nextType.methods.length > 0) {
      //add empty step
      chain.steps.push({
        methodId: null,
        parameters: [],
        currentType: currentType
      });
    }
    return chain;
  }

  createChainStep(currentType: TypeMetadata, methodId: string = null) {
    return this.fb.group({
      methodId: [methodId],
      currentType: [currentType],
      parameters: this.fb.array([])
    });
  }

  createParameterControl(paramMeta: ParameterMetadata): FormGroup {
    return this.fb.group({
      mode: ['input'], // Default mode is a simple input.
      inputValue: [''],
      chain: this.fb.array<FormGroup<any>>([]), // Explicitly typed as FormArray<FormGroup>
      metadata: [paramMeta]
    });
  }

  // Adds a new chain step with the provided current type.
  addChainStep(chain: FormArray, currentType: TypeMetadata): void {
    const step = this.fb.group({
      methodId: [null],
      parameters: this.fb.array([]),
      // We store the current type for this step so we know which methods to show.
      currentType: [currentType]
    });
    chain.push(step);
  }


  onMethodChange(chain: FormArray, index: number): void {
    // Remove all steps after this one.
    for (let i = chain.length - 1; i > index; i--) {
      chain.removeAt(i);
    }
    const chainStep = chain.at(index);
    const methodId = chainStep.get('methodId').value;
    // Reset parameters for this step.
    (chainStep as FormGroup).setControl('parameters', this.fb.array([]));

    if (methodId) {
      const currentType: TypeMetadata = chainStep.get('currentType').value;
      const selectedMethod = currentType.methods.find(m => m.id == methodId);
      if (selectedMethod) {
        const paramsFA = chainStep.get('parameters') as FormArray;
        selectedMethod.parameters.forEach(paramMeta => {
          paramsFA.push(this.createParameterControl(paramMeta));
        });

        // If the selected method’s return type can chain further, add a new chain step.
        const nextType = this.types.find(t => t.id === selectedMethod.returnType);
        if (nextType && nextType.methods && nextType.methods.length > 0) {
          this.addChainStep(chain, nextType);
        }
      }
    }
  }


  toggleParameterMode(chain: FormArray, chainStepIndex: number, paramIndex: number): void {
    const chainStep = chain.at(chainStepIndex);
    const paramsFA = chainStep.get('parameters') as FormArray;
    const paramControl = paramsFA.at(paramIndex);
    const currentMode = paramControl.get('mode').value;
    const chainFA = paramControl.get('chain') as FormArray;
    if (currentMode === 'input') {
      // Switch to chain mode.
      paramControl.get('inputValue').setValue('');
      chainFA.push(this.createChainStep(RootType));
      paramControl.get('mode').setValue('chain');
    } else {
      // Switch back to input mode.
      paramControl.get('mode').setValue('input');
      clearFormArray(chainFA);
    }
  }


  // Returns the available methods for a given chain step (by looking at its current type)
  getMethodsForStep(chain: FormArray, index: number): MethodMetadata[] {
    const chainStep = chain.at(index);
    const currentType: TypeMetadata = chainStep.get('currentType').value;
    return currentType.methods;
  }

  getParameters(chain: FormArray, stepIndex: number): AbstractControl[] {
    const chainStep = chain.at(stepIndex) as FormGroup;
    return (chainStep.get('parameters') as FormArray).controls;
  }

  displayChain(chain: any) {
    let res = "root"
    chain.forEach(step => {
      if (!step.methodId || step.methodId === 'null') {
        return
      }
      const method = step.currentType.methods.find(m => m.id == step.methodId);
      res += '.' + method.formulaDisplay
      if (step.parameters.length > 0) {
        res += '(';
        step.parameters.forEach(param => {
          if (param.mode === 'chain') {
            res += this.displayChain(param.chain)
          } else {
            res += param.inputValue
          }
          res += ','
        });
        res = res.slice(0, -1); // Remove trailing comma
        res += ')'
      }
    })
    return res
  }

  serializeFormula(chain: FormArray): string {
    let formula = ""
    chain.controls.forEach(control => {
      const methodId = control.get("methodId").value;
      const parameters = control.get("parameters") as FormArray;
      if (methodId && methodId !== 'null') { //IDK why the null is registered as a string
        formula += ";" + methodId;
      }
      if (parameters.length > 0) {
        formula += ";("
        parameters.controls.forEach(paramControl => {
          if (paramControl.get('mode').value === 'chain') {
            const nestedChain = paramControl.get('chain') as FormArray;
            formula += ';{' + this.serializeFormula(nestedChain) + ';}';
          } else {
            const param = paramControl.get('inputValue').value;
            formula += ';' + param;
          }
          formula += ';'
        });
        formula += ')'
      }
    });
    return formula;
  }

  submit(): void {
    const finalFormula = '{' + this.serializeFormula(this.chainControl) + ';}';
    this.dialogRef.close(finalFormula);
  }

  getFormArray(parent: AbstractControl, controlNameToGet: string): FormArray {
    return parent.get(controlNameToGet) as FormArray;
  }
}
