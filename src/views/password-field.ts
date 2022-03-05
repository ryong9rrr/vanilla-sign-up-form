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

  private buildData = () => {
    return {
      ...this.data,
      updated: this.updated,
      valid: true,
      strongMessage: "",
      strongLevel0: false,
      strongLevel1: false,
      strongLevel2: false,
      strongLevel3: false,
    };
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
