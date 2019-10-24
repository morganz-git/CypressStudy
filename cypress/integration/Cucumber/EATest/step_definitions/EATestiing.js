import {Given, Then} from "cypress-cucumber-preprocessor/steps";

// var {Given} = require('cucumber');
Given(/^I visit EA site$/, function () {
    cy.visit("http://eaapp.somee.com/")
});

Given(/^I click login link$/, function () {
    cy.contains("Login").click()
});

Given(/^I login as user with "([^"]*)" and "([^"]*)"$/, function (username, password) {
    //fill the username and password
    cy.get('#UserName').type(username);
    cy.get('#Password').type(password);

    //click the login button
    cy.get('.btn').click({force: true});
});