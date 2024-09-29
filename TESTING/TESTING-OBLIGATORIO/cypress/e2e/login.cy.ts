describe('Login Test', () => {
  it('should login with valid credentials', () => {
    cy.visit('/login');

    // Escribir el usuario
    cy.get('input[name="user"]').type('admin');

    // Escribir la contraseña
    cy.get('input[name="password"]').type('test');

    // Hacer clic en el botón de login
    cy.get('button[type="submit"]').click();

    // Comprobar si se redirige al dashboard o la página correcta
    cy.url().should('include', '/dashboard');
  });

  it('should show error message for invalid credentials', () => {
    cy.visit('/login');

    // Escribir credenciales inválidas
    cy.get('input[name="user"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');

    // Hacer clic en el botón de login
    cy.get('button[type="submit"]').click();

    // Comprobar que se muestra un mensaje de error
    cy.contains('Invalid username or password');
  });
});
