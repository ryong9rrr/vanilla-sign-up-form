import { Address, DaumAddress } from "../types";
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

  private zipcode?: string = "";
  private address1?: string = "";

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data };
  }

  public get isValid() {
    return true;
  }

  public get name(): string {
    return this.data.id;
  }

  public get value(): Address {
    const container = document.querySelector(this.container) as HTMLElement;
    const address2 = (container.querySelector("#address2") as HTMLInputElement)
      .value;

    return {
      zipcode: this.zipcode || "",
      address1: this.address1 || "",
      address2: address2 || "",
    };
  }

  public render = (append: boolean = false) => {
    if (!append) return;

    const container = document.querySelector(this.container) as HTMLElement;
    const divFragment = document.createElement("div");
    divFragment.innerHTML = this.template({
      ...this.data,
    });

    container.appendChild(divFragment.firstElementChild as HTMLElement);

    //다음 주소 api
    container
      .querySelector("#search-address")
      ?.addEventListener("click", (e) => {
        // submit이 일어나기 때문에, 이것은 원하지 않는 동작이다. submit은 회원가입 버튼에서만 일어나야한다.
        // 따라서 이벤트를 멈추기 위해 preventDefault();
        e.preventDefault();
        new window.daum.Postcode({
          // 화살표 함수로 구현을 하지 않는다면 this는 지금 이 클래스(AddressField)를 가리키지 않게 된다.
          // 따라서 화살표 함수를 사용했음.
          oncomplete: (data: DaumAddress) => {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            this.zipcode = data.sigunguCode;
            this.address1 = data.roadAddress;

            (
              container.querySelector("#address1") as HTMLInputElement
            ).value = `(${this.zipcode}) ${this.address1}`;
          },
        }).open();
      });
  };
}

export default AddressField;
