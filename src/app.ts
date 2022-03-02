import template from "./app.template";
import { AnyObject } from "./types";
import AddressField from "./views/address-field";
import PasswordField from "./views/password-field";
import TextField from "./views/text-field";

class App {
  private template = template;
  private container: HTMLElement;
  private data: AnyObject;
  private fields: AnyObject[];

  constructor(container: string, data: AnyObject = {}) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;
    this.fields = [];

    const nameField = new TextField("#required-fields", {
      id: "name",
      label: "이름",
      type: "text",
      placeholder: "이름을 입력해주세요",
      require: true,
    });

    const idField = new TextField("#required-fields", {
      id: "id",
      label: "아이디",
      type: "text",
      placeholder: "아이디를 입력해주세요",
      require: true,
    });

    const emailField = new TextField("#required-fields", {
      id: "email",
      label: "이메일",
      type: "email",
      placeholder: "이메일을 입력해주세요",
      require: true,
    });

    const passwordField = new PasswordField("#required-fields", {
      id: "password",
      label: "비밀번호",
      placeholder: "비밀번호를 입력해주세요",
    });

    const passwordCheckField = new PasswordField("#required-fields", {
      id: "password-check",
      label: "비밀번호 확인",
      placeholder: "비밀번호를 한번 더 입력해주세요",
    });

    const addressField = new AddressField("#optional-fields", {
      id: "address",
      label: "배송지 주소",
    });

    this.fields.push(nameField);
    this.fields.push(idField);
    this.fields.push(emailField);
    this.fields.push(passwordField);
    this.fields.push(passwordCheckField);
    this.fields.push(addressField);
  }

  public render() {
    this.container.innerHTML = this.template(this.data);
    this.fields.forEach((field) => {
      field.render(true);
    });

    this.container.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      console.log("제출");
    });
  }
}

export default App;
