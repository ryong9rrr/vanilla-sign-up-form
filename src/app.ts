import template from "./app.template";
import {
  CantContainWhitespace,
  CantStartNumber,
  MinimumLengthLimit,
} from "./constant";
import { AnyObject, User } from "./types";
import {
  AddressField,
  TextField,
  PasswordField,
  PasswordCheckField,
} from "./views";

class App {
  private template = template;
  private container: HTMLElement;
  private data: AnyObject;
  private fields: AnyObject[];
  private active: boolean = false;

  constructor(container: string, data: AnyObject = {}) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;
    this.fields = [];

    this.initialize();

    setInterval(this.validFieldMonitor, 1000 / 30);
  }

  private initialize = () => {
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

    const passwordCheckField = new PasswordCheckField("#required-fields", {
      id: "password-check",
      label: "비밀번호 확인",
      placeholder: "비밀번호를 한번 더 입력해주세요",
    });

    const addressField = new AddressField("#optional-fields", {
      id: "address",
      label: "배송지 주소",
    });

    idField.addValidateRule(CantContainWhitespace);
    idField.addValidateRule(CantStartNumber);
    idField.addValidateRule(MinimumLengthLimit(3));

    emailField.addValidateRule(CantContainWhitespace);

    this.fields.push(nameField);
    this.fields.push(idField);
    this.fields.push(emailField);
    this.fields.push(passwordField);
    this.fields.push(passwordCheckField);
    this.fields.push(addressField);
  };

  private validFieldMonitor = () => {
    const btnJoin = this.container.querySelector(
      "#btn-join"
    ) as HTMLButtonElement;

    if (
      this.fields.filter((field) => field.isValid).length === this.fields.length
    ) {
      this.active = true;
      btnJoin.classList.remove("bg-gray-300");
      btnJoin.classList.add("bg-green-500");
    } else {
      this.active = false;
      btnJoin.classList.remove("bg-green-500");
      btnJoin.classList.add("bg-gray-300");
    }
  };

  private onSubmit = (e: Event) => {
    e.preventDefault();

    if (!this.active) return;

    // User 타입으로 타입규격을 정하고 싶다면 어떻게 해야할까?
    const submitData: AnyObject = this.fields
      .map((field) => ({ [field.name]: field.value }))
      .reduce((a, b) => ({ ...a, ...b }), {});

    console.log(submitData);
  };

  public render() {
    this.container.innerHTML = this.template(this.data);
    this.fields.forEach((field) => {
      field.render(true);
    });

    this.container.addEventListener("submit", this.onSubmit);
  }
}

export default App;
