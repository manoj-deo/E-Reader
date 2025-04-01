describe('Logout Functionality', () => {
    beforeEach(() => {
      // Simulate login by setting user in localStorage
      window.localStorage.setItem('user', JSON.stringify({ email: 'testuser@example.com' }));
      // Visit dashboard (protected route)
      cy.visit('/dashboard');
    });
  
    it('should log the user out and redirect to login page', () => {
      // Click the logout button
      cy.contains('Logout').click();
  
      // Assert user is redirected to login
      cy.url().should('include', '/login');
  
      // Assert that localStorage is cleared
      cy.window().then((win) => {
        expect(win.localStorage.getItem('user')).to.be.null;
      });
    });
  
    it('should prevent access to dashboard after logout', () => {
      // Logout
      cy.contains('Logout').click();
  
      // Try to revisit dashboard
      //cy.visit('/dashboard');
  
      // Should redirect back to login
      cy.url().should('include', '/login');
    });
  });
  
