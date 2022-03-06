const anyClicked = () => {
  cy.get("#title").click();
};

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
    it("필수입력필드를 입력하고 넘어가면 초록불이 뜬다.", () => {
      cy.get("#field-name").type(`용상윤`);
      cy.get("#field-id").type(`ysy`);
      cy.get("#field-email").type(`ysy@naver.com`);
      cy.get("#field-password").type(`123123`);
      cy.get("#field-password-check").type(`123123`);
      anyClicked();

      cy.get("#required-fields .check").each(($el) => {
        expect($el).to.have.class("text-green-500");
      });
    });

    it("필수입력필드를 입력하지 않고 넘어가면 사용자에게 피드백을 준다.", () => {
      cy.get("#field-name").type(`용상윤`);
      cy.get("#field-id").type(`ysy`);
      cy.get("#field-email").type(`ysy@naver.com`);
      cy.get("#field-password").type(`123123`);
      cy.get("#field-password-check").type(`123123`);
      anyClicked();

      cy.get("#name").clear();
      cy.get("#id").clear();
      cy.get("#email").clear();
      cy.get("#password").clear();
      cy.get("#password-check").clear();
      anyClicked();

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

    it("비밀번호에는 '암호 수준'이 있다.", () => {
      // 비밀번호 수준이 2단계 이상일 경우 유효
      // 1~4단계가 있음.
    });
  });

  context("유효성 검증 테스트", () => {
    it("'이름'은 3글자 이상이어야 한다.", () => {
      //
    });

    it("비밀번호확인 필드는 비밀번호 필드와 동일한 값이어야 한다.", () => {
      // 1. 동일한 값일 경우, 초록불이 들어오는 것 확인
      cy.get("#field-password").type(`qwer123!@#`);
      cy.get("#field-password-check").type(`qwer123!@#`);
      anyClicked();
      cy.get("#field-password .check").should("have.class", "text-green-500");
      cy.get("#field-password-check .check").should(
        "have.class",
        "text-green-500"
      );

      // 2. 동일하지 않은 값일 경우 초록불이 꺼지고, 메세지가 출력하는지 확인
      cy.get("#field-password").type(`qwer123!@#`);
      cy.get("#field-password-check").type(`qwer123!@##`);
      anyClicked();
      cy.get("#field-password .check").should("have.class", "text-green-500");
      cy.get("#field-password-check .check").should(
        "have.class",
        "text-gray-200"
      );
      cy.get(".message").should("have.text", "비밀번호가 동일하지 않아요.");

      // 3. 빈 값을 입력했을 때는 필수입력항목이라는 메세지를 출력
      cy.get("#field-password").type(`qwer123!@#`);
      cy.get("#field-password-check").type(`qwer123!@##`);
      anyClicked();
      cy.get("#password-check").clear();
      anyClicked();
      cy.get("#field-password .check").should("have.class", "text-green-500");
      cy.get("#field-password-check .check").should(
        "have.class",
        "text-gray-200"
      );
      cy.get(".message").should("have.text", "필수 입력 항목입니다.");
    });
  });
});
