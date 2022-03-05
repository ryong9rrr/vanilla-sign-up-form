describe("회원가입 폼 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  context("렌더링 테스트", () => {
    it("5개의 필수입력필드와 주소필드가 있다.", () => {
      cy.get("#field-name");
      cy.get("#field-id");
      cy.get("#field-email");
      cy.get("#field-password");
      cy.get("#field-password-check");
      cy.get("#field-address");
    });

    it("처음에 필수입력필드의 배경색은 회색이다.", () => {
      cy.get("#required-fields input").each(($el) => {
        expect($el).to.have.class("bg-gray-200");
      });
    });
  });

  context("사용자 경험 테스트", () => {
    it("필수 입력 필드를 입력하고 넘어가면 초록불이 뜬다.", () => {
      cy.get("#field-name").type(`용상윤`);
      cy.get("#field-id").type(`ysy`);
      cy.get("#field-email").type(`ysy@naver.com`);
      cy.get("#field-password").type(`123123`);
      cy.get("#field-password-check").type(`123123`);
      cy.get("#title").click();

      cy.get("#required-fields .check").each(($el) => {
        expect($el).to.have.class("text-green-500");
      });
    });

    it("필수 입력 필드를 입력하지 않고 넘어간다면 사용자에게 피드백을 준다.", () => {
      cy.get("#field-name").type(`용상윤`);
      cy.get("#field-id").type(`ysy`);
      cy.get("#field-email").type(`ysy@naver.com`);
      cy.get("#field-password").type(`123123`);
      cy.get("#field-password-check").type(`123123`);
      cy.get("#title").click();

      cy.get("#name").clear();
      cy.get("#id").clear();
      cy.get("#email").clear();
      cy.get("#password").clear();
      cy.get("#password-check").clear();
      cy.get("#title").click();

      //1. 체크박스가 다시 회색으로 바뀐다.
      cy.get("#required-fields .check").each(($el) => {
        expect($el).to.have.class("text-gray-200");
      });

      //2. input 박스가 빨간색으로 바뀐다.
      cy.get("#required-fields input").each(($el) => {
        expect($el).to.have.class("bg-red-200");
      });

      //3. input 박스 아래에 피드백 메세지가 뜬다.
      cy.get("#required-fields .message").each(($el) => {
        expect($el).to.have.text("필수 입력 항목입니다.");
      });
    });
  });
});
