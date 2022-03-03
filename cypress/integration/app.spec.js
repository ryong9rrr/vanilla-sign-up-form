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
      cy.get("#field-name").type(`용상윤{enter}`);
      cy.get("#field-id").type(`ysy{enter}`);
      cy.get("#field-email").type(`ysy@naver.com{enter}`);
      cy.get("#field-password").type(`123123{enter}`);
      cy.get("#field-password-check").type(`123123`);
      cy.get("#title").click();

      cy.get("#required-fields svg").each(($el) => {
        expect($el).to.have.class("text-green-500");
      });
    });
  });

  // it("필수 입력 필드를 입력하지 않고 넘어간다면 사용자에게 피드백을 준다.", () => {
  //   // input을 빨간색으로 만들고, '필수 입력 항목입니다.' 라는 메세지를 띄운다.
  //   cy.get("#field-name").type(`hi{tab}`);
  // });
});
