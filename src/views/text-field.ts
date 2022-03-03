import { RequireRule } from "../constant";
import { ValidateRule } from "../types";
import template from "./text-field.template";

type Props = {
  id: string;
  label: string;
  type: "text" | "email" | "number";
  placeholder?: string;
  text?: string;
  require: boolean;
};

const DefaultProps = {
  id: "",
  label: "label",
  type: "text",
  text: "",
  placeholder: "텍스트를 입력해주세요",
  require: false,
};

class TextField {
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
  }

  public render = (append: boolean = false) => {
    if (!append) return;

    const container = document.querySelector(this.container) as HTMLElement;
    const divFragment = document.createElement("div");
    divFragment.innerHTML = this.template({
      ...this.data,
      updated: this.updated,
      valid: true,
      validateMessage: "",
    });
    container.appendChild(divFragment.children[0]);
  };
}

export default TextField;
