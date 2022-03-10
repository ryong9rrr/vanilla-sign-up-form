import { RequireRule } from "../constant";
import { ValidateRule } from "../types";
import { nextTick } from "../utils";
import template from "./password-field.template";

enum StrongLevel {
  None = 0,
  Light,
  Medium,
  Heavy,
}

type Props = {
  id: string;
  label: string;
  text?: string;
  placeholder?: string;
  require?: boolean;
  strong?: StrongLevel;
};

const DefaultProps: Props = {
  id: "",
  label: "label",
  text: "",
  placeholder: "텍스트를 입력해주세요",
  require: true,
  strong: StrongLevel.None,
};

const StrongMessage: [string, string, string, string] = [
  "금지된 수준",
  "심각한 수준",
  "보통 수준",
  "강력한 암호",
];

class PasswordField {
  private template = template;
  private container: string;
  private data: Props;
  private updated: boolean = false;
  private validateRules: ValidateRule[] = [];

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data };

    if (this.data.require) {
      this.validateRules.push(RequireRule);
    }

    nextTick(this.attachEventHandler);
  }

  private validate = (): ValidateRule | null => {
    const target = this.data.text ? this.data.text.trim() : "";

    const invalidateRules = this.validateRules.filter(
      (validateRule) => validateRule.rule.test(target) !== validateRule.match
    );

    return invalidateRules.length > 0 ? invalidateRules[0] : null;
  };

  private buildData = () => {
    let strongLevel = -1;
    const isInvalid: ValidateRule | null = this.validate();

    if (this.data.text!.length > 0) {
      strongLevel++;
    }

    if (this.data.text!.length > 12) {
      strongLevel++;
    }

    if (/[!@#$%^&*()]/.test(this.data.text!)) {
      strongLevel++;
    }

    if (/\d/.test(this.data.text!)) {
      strongLevel++;
    }

    return {
      ...this.data,
      updated: this.updated,
      valid: this.updated ? !isInvalid : true,
      validateMessage: this.updated && !!isInvalid ? isInvalid.message : "",
      strongLevel0: strongLevel >= 1,
      strongLevel1: strongLevel >= 2,
      strongLevel2: strongLevel >= 3,
      strongLevel3: strongLevel >= 4,
      strongMessage: strongLevel < 0 ? "" : StrongMessage[strongLevel],
    };
  };

  private update = () => {
    const container = document.querySelector(
      `#field-${this.data.id}`
    ) as HTMLElement;
    const divFragment = document.createElement("div");
    divFragment.innerHTML = this.template(this.buildData());
    container.innerHTML = divFragment.children[0].innerHTML;
  };

  private onChange = (e: Event) => {
    const { value, id } = e.target as HTMLInputElement;

    if (this.data.id === id) {
      this.updated = true;
      this.data.text = value;
      this.update();
    }
  };

  private attachEventHandler = () => {
    document
      .querySelector(this.container)
      ?.addEventListener("change", this.onChange);
  };

  public render = (append: boolean = false) => {
    if (!append) return;

    const container = document.querySelector(this.container) as HTMLElement;
    const divFragment = document.createElement("div");
    divFragment.innerHTML = this.template(this.buildData());
    container.appendChild(divFragment.children[0]);
  };
}

export default PasswordField;
