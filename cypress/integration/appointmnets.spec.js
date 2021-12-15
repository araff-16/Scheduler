const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {


  beforeEach(()=>{
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday")
  })


  xit("should book an interview", () => {
    
    cy.get("img[alt=Add]")
    .first()
    .click();

    cy.get("[data-testid=student-name-input]")
    .type("Lydia Miller-Jones")

    cy.get("img[alt='Sylvia Palmer']")
    .click();

    cy.contains("Save")
    .click()

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  xit("should edit an interview", () => {
    
    cy.get(".appointment__card--show")
    //.trigger('mouseover')
    .find("[alt=Edit]")
    .click({force: true})

    cy.get("img[alt='Tori Malcolm']")
    .click();

    cy.get("[data-testid=student-name-input]")
    .clear()
    .type("Bobby Brown")

    cy.contains("Save")
    .click()

    cy.contains(".appointment__card--show", "Bobby Brown");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("should cancel an interview", () => {
    
    cy.get(".appointment__card--show")
    //.trigger('mouseover')
    .find("[alt=Delete]")
    .click({force: true})

    cy.contains("Confirm")
    .click();

    cy.contains("Deleting")

    cy.contains("Deleting").should('not.exist')

    cy.contains(".appointment__card--show", "Archie Cohen").should('not.exist')

  });


})