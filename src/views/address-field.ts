import template from "./address-field.template";

type Props = {
  id: string;
  label: string;
  require?: boolean;
};

const DefaultProps: Props = {
  id: "",
  label: "label",
  require: false,
};

class AddressField {
  private template = template;
  private container: string;
  private data: Props;

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data };
  }

  public render = (append: boolean = false) => {
    if (!append) return;

    const container = document.querySelector(this.container) as HTMLElement;
    const divFragment = document.createElement("div");
    divFragment.innerHTML = this.template({
      ...this.data,
    });

    container.appendChild(divFragment.firstElementChild as HTMLElement);
  };
}

export default AddressField;
