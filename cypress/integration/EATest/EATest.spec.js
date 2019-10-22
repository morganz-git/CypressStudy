// /// <reference types="Cypress" />

describe("My first test", function () {

    before('Call for a link', function () {
        cy.visit('www.executeautomation.com/site');
    });
    //only的意思是只跑这个测试
    it('should testing ea site for assertion', function () {
        // cy.visit('www.executeautomation.com/site');
        //time out 是毫秒的单位
        //隐式等待
        // cy.get("[aria-label=\"jump to slide 2\"]", {timeout: 15000}).should("have.class", "ls-nav-active");
        //    <a href="#" aria-label="jump to slide 2" class="ls-nav-active"></a>

        //显示等待
        cy.get("[aria-label=\"jump to slide 2\"]", {timeout: 15000}).should(function ($x) {
            // cy.log('the value of $x', $x);--不知道为什么加了这个会导致验证失败
            expect($x).to.have.class("ls-nav-active");
            // $x.should("have.class","ls-nav-active");
            // !expect($x).to.not.be.null;
        })
    });

    it.only('should ligin and doing something', function () {
        cy.visit("http://eaapp.somee.com/");

        //利用text函数来得到值,然后放在一个别名的函数里面
        // cy.get('#loginLink').then(($link) => {
        //     return $link.text();
        // }).as("LinkText");

        //invoke 调用text方法
        cy.get('#loginLink').invoke('text').as("LinkText");

        cy.contains("Login").click();
        cy.get("@LinkText").then(($x) => {
            expect($x).is.eq("Login");
        });

        cy.url().should("include", "Login");
        cy.get('#UserName').type("admin");
        cy.get('#Password').type('password');
        cy.get('.btn').click();
        //********************
        /**
         //断言有两种,1 隐式断言 2 显示断言
         //隐式- 可以一次或者加 and 多次断言
         cy.get().should().and();
         //显示断言,用于一次向要断言多次
         cy.get().should(function ($tr) {
            expect().to.have.class();
            expect().to.have.attr();
        });
         **/
        //********************

        //    click the employee list
        cy.contains("Employee List").click();
        //对table进行操作 tr > td 表示找到每一行中的td
        /**
         cy.get('.table').find('tr > td').contains("Prashanth").parent().contains("Benefits").click();
         cy.get('.table').find('tr').as('rows');
         cy.get('@rows').then(function ($row) {
            //multiple true 的作用就是, 将得到的所有的row都点击一次.
            cy.wrap($row).click({multiple: true});
        })
         **/
        //    verity the value from property, 下面额用法比较重要
        cy.wrap({name: 'Karthik'}).should("have.property", 'name').and('eq', 'Karthik')
        // cy.get('.table').find('tr > td').contains("Prashanth").parent().contains("Benefits").click();

        cy.get('.table').find('tr>td').then(function ($td) {
            cy.wrap($td).contains('John').invoke("wrap").parent().contains("Benefits").click()
        })
    });
});
