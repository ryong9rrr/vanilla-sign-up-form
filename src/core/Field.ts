import { ValidateRule } from "../types";

export default class Field {
  protected validateRules: ValidateRule[] = [];

  public addValidateRule = (rule: ValidateRule) => {
    this.validateRules.push(rule);
  };
}
