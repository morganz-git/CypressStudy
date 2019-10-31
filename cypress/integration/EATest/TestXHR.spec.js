describe("Test LambdaTest Website XHR", function () {

    beforeEach("Navigate to LambdaTest", function () {
        cy.visit("https://accounts.lambdatest.com/login");
    });

    it('Perform login and verify XHR', function () {
        //start the server
        cy.server();

        cy.route({
            method: "GET",
            url: "/api/user/organization/team"
        }).as("team");

        cy.route({
            method: "GET",
            url: "/api/user/organization/automation-test-summary"
        }).as("apicheck");

        cy.fixture("LambdaTest").as("user");
        cy.get("@user").then(function (user) {
            cy.get('[type="email"]').type(user.username);
            cy.get('[type="password"]').type(user.password, {log: false});
        });
        cy.get('.btn').click({force: true});

        //    assert the response
        cy.get("@team").then(function (xhr) {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body.data[0]).to.have.property("name", "huahua");
            expect(xhr.response.body.data[0]).to.have.property("role", "Admin");
        });

        cy.get("@apicheck").then(function (xhr) {
            expect(xhr.status).to.eq(200);
            // expect(xhr.response.body).to.have.property("name", "huahua");
            // expect(xhr.response.body).to.have.property("role", "Admin");
        });
        // implicit assertion
        // cy.get("@apicheck").its("response.body").should("", "").and("", )
    });
    it.only('Verify LambdaTest cookies', function () {
        //lgoin
        cy.fixture("LambdaTest").as("user");
        cy.get("@user").then(function (user) {
            cy.get('[type="email"]').type(user.username);
            cy.get('[type="password"]').type(user.password, {log: false});
        });
        cy.get('.btn').click({force: true});
        cy.getCookie("user_id").should("have.property","value","113173")
    });
});