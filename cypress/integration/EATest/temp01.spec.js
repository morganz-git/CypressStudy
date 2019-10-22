/// <reference types="Cypress" />
describe("bit demo test", function () {
    it('should demo ', function () {
        cy.visit('https://example.cypress.io')

        cy.title().should('include', 'Kitchen Sink')
    });
});
