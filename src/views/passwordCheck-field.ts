import { RequireRule } from "../constant";
import { ValidateRule } from "../types";
import { nextTick } from "../utils";
import template from "./passwordCheck-field.template";

type Props = {
  id: string;
  label: string;
  text?: string;
  placeholder?: string;
  require?: boolean;
};

const DefaultProps: Props = {
  id: "",
  label: "label",
  text: "",
  placeholder: "텍스트를 입력해주세요",
  require: true,
};

class PasswordCheckField {
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

  private isMatchedPassword = (): boolean => {
    const password = (document.querySelector("#password") as HTMLInputElement)
      ?.value;

    return this.data.text === password;
  };

  private validate = (): ValidateRule | null => {
    const target = this.data.text ? this.data.text.trim() : "";

    const invalidateRules = this.validateRules.filter(
      (validateRule) => validateRule.rule.test(target) !== validateRule.match
    );

    // rule, match에는 일단 아무값이나 넣었음
    return invalidateRules.length > 0
      ? invalidateRules[0]
      : this.isMatchedPassword()
      ? null
      : {
          rule: /fd/g,
          match: true,
          message: "비밀번호가 동일하지 않아요.",
        };
  };

  private buildData = () => {
    const isInvalid: ValidateRule | null = this.validate();

    return {
      ...this.data,
      updated: this.updated,
      valid: this.updated ? !isInvalid : true,
      validateMessage: this.updated && !!isInvalid ? isInvalid.message : "",
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

  public get isValid(): boolean {
    return !this.validate();
  }

  public get name(): string {
    return this.data.id;
  }

  public get value(): string {
    return this.data.text || "";
  }

  public render = (append: boolean = false) => {
    if (!append) return;

    const container = document.querySelector(this.container) as HTMLElement;
    const divFragment = document.createElement("div");
    divFragment.innerHTML = this.template(this.buildData());
    container.appendChild(divFragment.children[0]);
  };
}

export default PasswordCheckField;
