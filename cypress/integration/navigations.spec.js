describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should nvaigate to Tuesday", () => {
    cy.visit("/")
    
    // cy.get(".sidebar__menu ul,")
    // .contains('Tuesday')
    // .click()
    // cy.contains("li", "Tuesday").should("have.css", "background-color", "rgb(242, 242, 242)")

    //REFACTOR 1
    // cy.contains("li", "Tuesday")
    // .click()
    // .should("have.css", "background-color", "rgb(242, 242, 242)");

    //REFACTOR 2
    // cy.contains(".sidebar__menu ul li","Tuesday")
    // .click()
    // .should("have.css", "background-color", "rgb(242, 242, 242)")

    //REFACTOR 3
    cy.contains("[data-testid=day]","Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")

  });



});