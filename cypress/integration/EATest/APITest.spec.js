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
});