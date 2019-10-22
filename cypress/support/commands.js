// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
//
// Cypress.Commands.add("login", (email, password) => {
//     cy.get('#loginLink').invoke("text").as('LinkText');
//     cy.contains('Login').click();
//     cy.get("@LinkText").then(function ($x) {
//         expect($x).is.eq("Login");
//     });
//     cy.url().should("include", "/Account/Login");
//     cy.get("@user").then((user) => {
//         cy.get('#UserName').type(email)
//         cy.get('#Password').type(password)
//     });
//     cy.get('.btn').click({force: true});
// });
Cypress.Commands.add("Login", function (username, password) {
    cy.get('#loginLink').invoke("text").as('LinkText');
    //check the text on login link
    cy.get("@LinkText").then(function ($x) {
        expect($x).is.eq("Login");
    });

    //click login button
    cy.get("#loginLink").click();

    //verify the url
    cy.url().should("include", "/Account/Login");
    //fill the username and password
    cy.get('#UserName').type(username);
    cy.get('#Password').type(password);
    //click the login button
    cy.get('.btn').click({force: true});
});
