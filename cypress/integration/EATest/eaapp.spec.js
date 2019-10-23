/// <reference types="Cypress" />

describe("", function () {
    before("Login to application", function () {
        cy.visit("/");
        //sharing context
        cy.fixture("eauser").as("user");
        // fill the username and password
        cy.get("@user").then((user) => {
            cy.Login(user.UserName, user.Password);
        });
    });

    it('Performing Benefit check', function () {
        //click the employee list
        cy.get('.navbar-collapse > :nth-child(1) > :nth-child(3) > a').click();

        // Table
        cy.get(".table").find("tr").contains("Prashanth").parent().contains("Benefits").click()
        cy.get(".table").find("tr").as("rows");
        cy.get("@rows").then(function ($row) {
            cy.wrap($row).click({
                multiple: true
            })
        });

        //verity the value from a property
        cy.wrap({name: 'Karthik'}).should("have.property", 'name').and("eq", 'Karthik')
    });
});
