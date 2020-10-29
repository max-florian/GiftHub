const { createYield } = require("typescript")

describe('Test de POST/Registro', () => {
    it('Registrar el usuario luego de presionar el "Registrarse"',() => {

        const datosUsuario = {
            nombre: "Max Florian",
            id: "testmaster69",
            email: "max@gifthubmail.com",
            contrasena: "contraseña234"
        };

        cy.visit('http://localhost:3000/')

        cy.get('#nombreInput')
        .type(datosUsuario.nombre)
        .should('have.value',datosUsuario.nombre)

        cy.get('#idInput')
        .type(datosUsuario.id)
        .should('have.value',datosUsuario.id)

        cy.get('#emailInput')
        .type(datosUsuario.email)
        .should('have.value',datosUsuario.email)

        cy.get('#contrasenaInput')
        .type(datosUsuario.contrasena)
        .should('have.value',datosUsuario.contrasena)

        cy.get('#btnRegistro').click().then(($btnRegistro) => {
            cy.request('POST','http://localhost:4000/api/registro',datosUsuario)
            .then((response) => {
                expect(response.body).to.not.have.property('mensaje', 'Ha ocurrido un error en el servidor')
            })
        })
    })
})