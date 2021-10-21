/// <reference types="cypress" />

describe("Network stubbing", () => {
  it("I can change the network response", () => {
    cy.intercept("/api/boards", { fixture: "board.json" }).as("fakeBoard");
    cy.visit("/");
    cy.wait("@fakeBoard").then((data) => {
      expect(data.response.body[0].name).to.eq("EDITED BOARD");
      expect(data.response.statusCode).to.eq(200);
      expect(data.state).to.eq("Complete");
      console.log(data);
    });
  });

  it.only("Dynamically change parts of the response data", () => {
    cy.intercept("/api/boards", [
      {
        name: "CCCCC",
      },
    ]);
    cy.visit("/");
  });
  it.only("create board with cy.request", () => {
    cy.request("POST", "/api/boards", {
      name: "Board Created With cy.request",
    });
    cy.visit("/");
  });
  it("delete created board", () => {
    cy.request("DELETE", "api/boards");
    cy.visit("/");
  });
});
