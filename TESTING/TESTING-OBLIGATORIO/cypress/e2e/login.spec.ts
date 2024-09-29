describe('Login Test', () => {
  it('credenciales validos', () => {
    cy.visit('/');

    // Escribir el usuario
    cy.get('input[name="user"]').type('admin');

    // Escribir la contraseña
    cy.get('input[name="password"]').type('test');

    // Hacer clic en el botón de login
    cy.get('button[type="submit"]').click();

    // // Comprobar si se redirige al dashboard o la página correcta
    // cy.url().should('include', '/dashboard');
  });

  it('se muestra el mensajes de credenciales incorrectas', () => {
    cy.visit('/');

    // Escribir credenciales inválidas
    cy.get('input[name="user"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');

    // Hacer clic en el botón de login
    cy.get('button[type="submit"]').click();

    // Comprobar que se muestra un mensaje de error
    cy.contains('Usuario y/o password no válidos');
  });
});
