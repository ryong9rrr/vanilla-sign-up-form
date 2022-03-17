import { Template, ValidateRule } from "../types";

interface Params {
  template: Template;
  container: string;
}

// function pipe<DataProps>(data: DataProps): DataProps {
//   return data;
// }

abstract class Field {
  protected template: Template;
  protected container: string;
  protected validateRules: ValidateRule[] = [];

  constructor(params: Params) {
    const { template, container } = params;
    this.template = template;
    this.container = container;
  }

  public addValidateRule = (rule: ValidateRule) => {
    this.validateRules.push(rule);
  };
}

export default Field;
