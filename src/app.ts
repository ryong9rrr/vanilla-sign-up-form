import template from "./app.template";
import { AnyObject } from "./types";

const textFieldTemplate = `
  <div id="field-{{id}}" class="mt-4">
    <div class="flex items-start mb-1">
      <span class="flex items-center">
        <svg class="flex-shrink-0 h-5 w-5 {{#if valid}}{{#if updated}}text-green-500{{else}}text-gray-200{{/if}}{{else}}text-gray-200{{/if}}" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </span>
      <label class="block text-sm" for="name">{{label}}</label>
    </div>
    <input id="{{id}}" name="{{id}}" type="{{type}}" value="{{text}}" {{#if require}}required{{/if}} 
      placeholder="{{placeholder}}" aria-label="Name" class="w-full px-5 py-1 text-gray-700 {{#if valid}}bg-gray-200{{else}}bg-red-200{{/if}} rounded">
    {{#unless valid}}
    <div class="flex items-start mb-1">
      <label class="block text-sm text-red-300" for="cus_email">{{validateMessage}}</label>
    </div>
    {{/unless}}
  </div>
`;

const passwordFieldTemplate = `
  <div id="field-{{id}}">
    <div class="mt-4">
      <div class="flex items-start mb-1">
        <span class="flex items-center">
          <svg class="flex-shrink-0 h-5 w-5 {{#if valid}}{{#if updated}}text-green-500{{else}}text-gray-200{{/if}}{{else}}text-gray-200{{/if}}" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </span>        
        <label class="block text-sm" for="password">{{label}}</label>
      </div>
      <input id="{{id}}" name="{{id}}" type="password" value="{{text}}" placeholder="{{placeholder}}" {{#if require}}required{{/if}} aria-label="Password" class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
      </div>

      <div class="mt-1">
      <div class="flex items-start mb-1">
        {{#if strongLevel0}}
        <span class="flex items-center">
          <svg class="flex-shrink-0 h-5 w-5 text-green-100" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </span>        
        {{/if}}

        {{#if strongLevel1}}
        <span class="flex items-center">
          <svg class="flex-shrink-0 h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </span>        
        {{/if}}

        {{#if strongLevel2}}
        <span class="flex items-center">
          <svg class="flex-shrink-0 h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </span>        
        {{/if}}

        <label class="block text-sm text-gray-300" for="cus_email">{{strongMessage}}</label>
      </div>
    </div>
  </div>
`;

const adressFieldTemplate = `
  <div id="field-{{id}}">

    <div class="mt-2">
      <label class="block text-sm" for="cus_email">{{label}}</label>
      <div class="flex items-center">
        <input id="address1" name="address1" type="text" value="{{displayAddress}}" placeholder="주소를 검색해 주세요" class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded">
        <button id="search-address" class="bg-gray-300 text-gray-500 px-1 py-1 rounded shadow " style="margin-left: -3rem;">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </div>
    </div>

    <div class="mt-2">
      <label class="hidden text-sm block text-gray-600" for="address2">상세 주소</label>
      <input id="address2" name="address2" type="text" placeholder="상세 주소" aria-label="Address 2" class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded" >
    </div>

  </div>
`;

class App {
  private template = template;
  private container: HTMLElement;
  private data: AnyObject;

  constructor(container: string, data: AnyObject = {}) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;
  }

  public render() {
    const divFragment = document.createElement("div");
    const divFragment2 = document.createElement("div");

    const requiredFields = [];
    const adressFields = [];

    const nameField = window.Handlebars.compile(textFieldTemplate)({
      id: "name",
      label: "이름",
      type: "text",
      placeholder: "이름을 입력해주세요",
      require: true,
    });

    const idField = window.Handlebars.compile(textFieldTemplate)({
      id: "id",
      label: "아이디",
      type: "text",
      placeholder: "아이디를 입력해주세요",
      require: true,
    });

    const emailField = window.Handlebars.compile(textFieldTemplate)({
      id: "email",
      label: "이메일",
      type: "email",
      placeholder: "이메일을 입력해주세요",
      require: true,
    });

    const passwordField = window.Handlebars.compile(passwordFieldTemplate)({
      id: "password",
      label: "비밀번호",
      type: "password",
      placeholder: "비밀번호를 입력해주세요",
      require: true,
    });

    const passwordCheckField = window.Handlebars.compile(passwordFieldTemplate)(
      {
        id: "password-check",
        label: "비밀번호 확인",
        type: "password",
        placeholder: "비밀번호를 한번 더 입력해주세요",
        require: true,
      }
    );

    requiredFields.push(nameField);
    requiredFields.push(idField);
    requiredFields.push(emailField);
    requiredFields.push(passwordField);
    requiredFields.push(passwordCheckField);

    const addressField = window.Handlebars.compile(adressFieldTemplate)({
      id: "adress",
      label: "배송지 주소",
    });

    this.container.innerHTML = this.template(this.data);

    divFragment.innerHTML = requiredFields.join("");

    document.querySelector("#required-fields")?.appendChild(divFragment);

    adressFields.push(addressField);

    divFragment2.innerHTML = adressFields.join("");

    document.querySelector("#optional-fields")?.appendChild(divFragment2);
  }
}

export default App;
