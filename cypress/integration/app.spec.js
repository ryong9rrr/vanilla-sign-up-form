describe("회원가입 폼 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

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
