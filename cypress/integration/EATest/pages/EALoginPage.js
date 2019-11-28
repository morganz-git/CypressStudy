class EALoginPage {
    performLogin(username, password) {
        cy.get("#UserName").type(username);
        cy.get("#Password").type(password, {log: false});

    }
}