const {
    Before,
    After,
    Given,
    Then
} = require("cypress-cucumber-preprocessor/steps");

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
    //log 的主要作用就是用来屏蔽不方便显示的东西
    cy.get('#Password').type(password, {log: false});

    //click the login button
    cy.get('.btn').click({force: true});
});
Given(/^I login with the tabledata$/, function (dataTable) {
    dataTable.hashes().forEach(function (row) {
        cy.get('#UserName').type(row.userName);
        //log 的主要作用就是用来屏蔽不方便显示的东西
        cy.get('#Password').type(row.Password, {log: false});
    });
    cy.get(".btn").click({force: true})
});