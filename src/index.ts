import App from "./app";
import { AnyObject } from "./types";

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: AnyObject) => string;
    };
  }
}

const app = new App("#root", { title: "회원가입 폼 연습하기" });

window.addEventListener("DOMContentLoaded", () => app.render());
