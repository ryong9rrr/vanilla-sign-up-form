import { RequireRule } from "../constant";
import { ValidateRule } from "../types";
import { nextTick } from "../utils";
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

    // 계속해서 이벤트를 받기 위해 setTimeout을 걸어줬다.
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
    if (this.updated) {
      return {
        ...this.data,
        updated: this.updated,
        valid: true,
        validateMessage: "",
      };
    }
    return {
      ...this.data,
      updated: this.updated,
      valid: true,
      validateMessage: "",
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

export default TextField;
