import App from "./app";
import { Template } from "./types";

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => Template;
    };
    daum: any;
  }
}

const app = new App("#root", { title: "회원가입 폼 연습하기" });

window.addEventListener("DOMContentLoaded", () => app.render());
