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

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data };
  }

  public render = (append: boolean = false) => {
    const container = document.querySelector(this.container) as HTMLElement;

    if (append) {
      const divFragment = document.createElement("div");
      divFragment.innerHTML = this.template({
        ...this.data,
        updated: this.updated,
        valid: true,
        validateMessage: "",
      });
      container.appendChild(divFragment.children[0]);
    }
  };
}

export default TextField;
