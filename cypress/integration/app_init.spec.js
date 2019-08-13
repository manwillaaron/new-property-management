describe("App initialization", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get('.input1')
    .type('1')

    cy.get('.input2')
    .type('1')
    .type('{enter}')
  });

  it("Loads dashbord on page load", () => {
    cy.get(".picture-buttons-admin")
      .should("exist")
      .and("have.length", 4);

      cy.get('.header-button-logout')
      .click()
  });

  it('properties', ()=>{
    cy.get(".picture-buttons-admin")
      .first()
      .click()

      cy.get(".picture-buttons-properties")
      .should("exist")

      cy.get('.header-button-logout')
      .click()
  })

  it("navagates correctly to properties", () => {
    cy.get(".picture-buttons-admin")
      .first()
      .click()

      cy.get(".picture-buttons-properties")
      .should("exist")
      .first()
      .click()

      cy.get('.general-info-items-prop')
      .should('exist')

      cy.get('.header-button-logout')
      .click()
  });

  // it("should be focused on a new todo input", () => {
  //     cy.focused()
  //     .should('exist')
  // });
});
