const { createYield } = require("typescript")

describe('Test de POST/Login', () => {
    it('Loggearse a la aplicacion"',() => {

        const datosUsuariol = {
            emailusername: "alexizzarevalo",
            password: "algoquenoesmax2"
        };

        cy.visit('http://localhost:3000/')

        cy.get('#emailInput')
        .type(datosUsuariol.emailusername)
        .should('have.value',datosUsuariol.emailusername)

        cy.get('#passwordInput')
        .type(datosUsuariol.password)
        .should('have.value',datosUsuariol.password)

        cy.get('#btnLogin').click()

        cy.url().should('contain','/home')
    })
})