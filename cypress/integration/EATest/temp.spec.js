/// <reference types="Cypress" />
import 'cypress-pipe'

function fitzzbuss(number) {
    if (number % 3 === 0 && number % 5 === 0) {
        return 'fizzbuzz'
    }
    if (number % 3 === 0) {
        return 'fizz'
    }
    if (number % 5 === 0) {
        return 'buzz'
    }
}

//
describe('Unit test', function () {
    function numsExpectedToEq(arr, expected) {
        arr.forEach((num) => {
            expect(fitzzbuss(num)).to.eq(expected)
        })
    }

    it.only('return fitzz', function () {
        numsExpectedToEq()
    });
    it.skip('skip this test', function () {
    });
});

//动态生成测试
describe('if your app use jQuery', function () {
    ['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {
        it('trigger event' + event, function () {
            cy
                .get().invoke('trigger', event)
                .get().should("contain", 'the event' + event + 'was fired')
        });
    })
});

//只有最后一个its会被重试
// 🛑 不推荐
// 只有最后一个`its`会被重试
cy.window()
    .its('app')             // 运行一次
    .its('model')           // 运行一次
    .its('todos')           // 重试
    .should('have.length', 2)

// ✅ 推荐  its是用来获取上一个对象的
cy.window()
    .its('app.model.todos') // 重试
    .should('have.length', 2)


// 你可以使用这个第三方插件来重试附加了断言的任何功能：cypress-pipe。 https://github.com/NicholasBoll/cypress-pipe
// break on a debugger before the action command--调试语句
cy.get('button').debug().click();

cy.get('button').then(($btn) => {
    const txt = $btn.text();
    cy.get("form").submit();
    cy.get("button").should(($btn2) => {
        expect($btn2.text()).not.to.eq(txt);
    })
});

//别名
describe('parent', function () {
    beforeEach(function () {
        cy.wrap('one').as('a');
        cy.wrap('two').as('b');
        cy.wrap('three').as('c')
    });
    describe('child', function () {
        beforeEach(function () {
            cy.wrap('two').as('b');
        })
    });
    describe('gradchild', function () {
        beforeEach(function () {
            cy.wrap('three').as('c')
        });
    });

    it('should access all aliases as properties', function () {
        expect(this.a).to.eq('one');
        expect(this.b).to.eq('two');
        expect(this.c).to.eq('three');
    });
});

beforeEach(function () {
    cy.fixture('user.json').as('users');
});
Cypress._.times(100, (i) => {
    it('should num ${i+1}-test the thing', function () {
    });
});

// 指定运行某一个相关文件
// npx cypress run --record --spec "cypress/integration/my-spec.js"