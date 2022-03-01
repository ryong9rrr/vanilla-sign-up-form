describe("회원가입 폼 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1234/");
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  // 오늘여기까지만
  it("5개의 필수 입력 필드가 있다.", () => {
    cy.get("#field-name");
    cy.get("#field-id");
    cy.get("#field-email");
    cy.get("#field-password");
    cy.get("#field-password-check");
  });
});
