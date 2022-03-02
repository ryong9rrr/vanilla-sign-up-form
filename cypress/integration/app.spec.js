describe("회원가입 폼 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("5개의 필수 입력 필드와 주소필드가 있다.", () => {
    cy.get("#field-name");
    cy.get("#field-id");
    cy.get("#field-email");
    cy.get("#field-password");
    cy.get("#field-password-check");
    cy.get("#field-address");
  });
});
