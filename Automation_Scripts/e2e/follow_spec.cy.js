describe('Profile and Follow Test', () => {
    it('should allow user to log in, follow, and see follow notification', () => {
      // First User: fatima@gmail.com
      cy.visit('http://localhost:5173/login');
  
      // Perform login action
      cy.get('.flip-card__inner .flip-card__front input[name="email"]').type('fatima@gmail.com');
      cy.get('.flip-card__inner .flip-card__front input[name="password"]').type('fatima');
      cy.get('.flip-card__inner .flip-card__front button.flip-card__btn').click();

      cy.contains('Logged in successfully!').should('be.visible');

      cy.url().should('include', '/');
  
      cy.get(".blog-item").should("contain", "food");
      cy.contains('.blog-item', 'food').click();
  
      // Use the specific data-testid to find the follow button
      cy.get('[data-testid="follow-button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .scrollIntoView()
      .wait(1000) // Add a small wait to ensure any animations complete
      .click({ force: true }); // Use force as a fallback

      // Assert that the toast notification appears
      cy.get('.Toastify__toast-body').should('contain', 'You are already following this user');
  
      // Wait for any existing toast to disappear (if present)
      cy.wait(1000); // Optional: wait for toast animation
      
      // Log out with force: true to handle any overlay issues
      cy.get('.nav-links').contains('Login').click({ force: true });
      

      // Verify we're back at the login page
      cy.url().should('include', '/login');

      // Second User: amna@gmail.com
      cy.get('.flip-card__inner .flip-card__front input[name="email"]').type('amna@gmail.com');
      cy.get('.flip-card__inner .flip-card__front input[name="password"]').type('amna');
      cy.get('.flip-card__inner .flip-card__front button.flip-card__btn').click();

      
      cy.url().should('include', '/'); 
  
      cy.get('.nav-links').contains('Profile').click();
  
      cy.get('.flip-card__inputt')
        .contains('Following')
        .next()
        .within(() => {
          cy.contains('6756f1ddafa6b11a95a15bf0');
        });
    });

    // Test 2: Disable follow button after clicking it ; failed since no fucnitonality for follow button
    it('should disable follow button after clicking it', () => {
        // Login as fatima@gmail.com
        cy.visit('http://localhost:5173/login');
        cy.get('.flip-card__inner .flip-card__front input[name="email"]').type('fatima@gmail.com');
        cy.get('.flip-card__inner .flip-card__front input[name="password"]').type('fatima');
        cy.get('.flip-card__inner .flip-card__front button.flip-card__btn').click();
        
        cy.url().should('include', '/');
    
        // Navigate to a blog item
        cy.contains('.blog-item', 'food').click();
    
      // Use the specific data-testid to find the follow button
      cy.get('[data-testid="follow-button"]')
      .should('be.visible')
      .and('not.be.disabled')
      .scrollIntoView()
      .wait(1000) // Add a small wait to ensure any animations complete
      .click({ force: true }); // Use force as a fallback
        
        // Assert the toast notification
        cy.get('.Toastify__toast-body').should('contain', 'You are already following this user');
        
        // Verify that the follow button is disabled after clicking
        cy.get('[data-testid="follow-button"]').should('be.disabled');
    
        // Log out
        cy.get('.nav-links').contains('Login').click();
        cy.url().should('include', '/login');
      });

        it('should display the correct followers and following in the profile', () => {
          // Login as fatima@gmail.com
          cy.visit('http://localhost:5173/login');
          cy.get('.flip-card__inner .flip-card__front input[name="email"]').type('fatima@gmail.com');
          cy.get('.flip-card__inner .flip-card__front input[name="password"]').type('fatima');
          cy.get('.flip-card__inner .flip-card__front button.flip-card__btn').click();
          
          cy.url().should('include', '/');
      
          // Navigate to profile
          cy.get('.nav-links').contains('Profile').click();
          
          // Check followers
          cy.get('.flip-card__inputt').contains('Followers').next().within(() => {
            cy.contains('6756f258afa6b11a95a15c05'); // Assuming Amna is a follower of Fatima
          });
          
          // Check following
          cy.get('.flip-card__inputt').contains('Following').next().within(() => {
            cy.contains('6756f258afa6b11a95a15c05'); // Assuming Fatima follows Amna
          });

      });
      
});

//Amna's id =6756f258afa6b11a95a15c05

