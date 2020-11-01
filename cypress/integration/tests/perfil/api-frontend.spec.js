const { createYield } = require("typescript")

describe('Test de POST/Profile', () => {
    it('Actualizar informacion de perfil',() => {

        const datosUsuariop = {
            emailusername: "alexizzarevalo",
            password: "algoquenoesmax2"
        };

        cy.visit('http://localhost:3000/')

        cy.get('#emailInput')
        .type(datosUsuariop.emailusername)
        .should('have.value',datosUsuariop.emailusername)

        cy.get('#passwordInput')
        .type(datosUsuariop.password)
        .should('have.value',datosUsuariop.password)

        cy.get('#btnLogin').click()

        cy.url().should('contain','/home')

        cy.visit('http://localhost:3000/profile')

        cy.get('#age').type('{backspace}{backspace}3');
        cy.get('#btnUpdate').click()
        .should('be.disabled')

        cy.visit('http://localhost:3000/profile')
        cy.get('#age').should('have.value','30')
    })
})