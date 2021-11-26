
export const FormSymbol = Symbol('Form symbol');

export class FormController {
  readonly initialValus: Record<string, any>;

  constructor(values: Record<string, any>) {
    this.initialValus = values;
  }
  async validate(): Promise<Record<string, any>> {
    return {};
  }
  reset() {

  }
}