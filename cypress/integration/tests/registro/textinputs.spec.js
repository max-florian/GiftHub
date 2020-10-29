const { createYield } = require("typescript")

describe('Test de TextInputs', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('acepta elementos',() => {
        cy.get('#nombreInput')
        .type('Max Florian')
        .should('have.value','Max Florian')

        cy.get('#idInput')
        .type('kindasus777')
        .should('have.value','kindasus777')

        cy.get('#emailInput')
        .type('maxcorreo@gmail.com')
        .should('have.value','maxcorreo@gmail.com')

        cy.get('#contrasenaInput')
        .type('kindasus777')
        .should('have.value','kindasus777')
    })
})