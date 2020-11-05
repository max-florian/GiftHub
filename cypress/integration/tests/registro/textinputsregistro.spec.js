const { createYield } = require("typescript")

describe('Test de TextInputs', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('#btnRegistro').click()
    })

    it('acepta elementos',() => {
        cy.get('#nombreInputR')
        .type('Max Florian')
        .should('have.value','Max Florian')

        cy.get('#idInputR')
        .type('kindasus777')
        .should('have.value','kindasus777')

        cy.get('#emailInputR')
        .type('maxcorreo@gmail.com')
        .should('have.value','maxcorreo@gmail.com')

        cy.get('#contrasenaInputR')
        .type('kindasus777')
        .should('have.value','kindasus777')
    })
})