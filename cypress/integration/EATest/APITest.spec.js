describe("Test API from the fake JSON Server", function () {

    beforeEach("Test, delete before test", function () {
        cy.request({
            method: "DELETE",
            url: "http://localhost:3000/posts/2",
            //跳过status_code 的检查
            failOnStatusCode: false
        }).then(function (res) {
            expect(res.body).to.be.empty
        })
    });
    it('Test GET functionality of JSON Server', function () {
        //default is GET
        cy.request("http://localhost:3000/posts/1").its("body").should("have.property", "id", 1)
    });
    it('Test POST', function () {
        cy.request({
            url: "http://localhost:3000/posts",
            method: "POST",
            body: {
                "id": 2,
                "title": "just for testing",
                "author": "morgan"
            }
        }).then(function (res) {
            expect(res.body).has.property("title", "just for testing")
        })
    });
    it.only("API testing", function () {
        cy.request({
            method: "POST",
            url: "http://eaapp.somee.com/Account/Login",
            body: {
                "__RequestVerificationToken": "9eVrPje8clsocJ-FOuzUEvXsIRr5eLK6UYMI9sL2AuDHhcNBaqmqqQJOmmKGlpsS49m6QoVMcexYn37elKsEnuaCnrHO2ctHe0EJ30g6Ulo1",
                "UserName": "admin",
                "Password": "password",
                "RememberMe": "false"
            },
            failOnStatusCode: false
        }).then(function (res) {
            // debugger;
            expect(res.status).to.eql(500);
            expect(res.body).to.contain("The required anti-forgery cookie &quot;__RequestVerificationToken&quot; is not present.")

        })
    })
});