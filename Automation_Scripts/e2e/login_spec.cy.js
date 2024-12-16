// cypress/integration/login_spec.js

describe('Login Functionality', () => {
  // Before each test, visit the login page
  beforeEach(() => {
    // This command visits the login page of the application
    // The URL is assumed to be 'http://localhost:5173/login', but adjust this based on your routing setup
    cy.visit('http://localhost:5173/login');
  });

  /**
   * Test case for successful login with valid credentials.
   * It ensures that the user can login with correct credentials and sees the appropriate success message.
   */
  it('should login successfully with valid credentials', () => {
    // Find the email input field by its 'name' attribute and type the valid email address
    cy.get('.flip-card__inner .flip-card__front input[name="email"]').type('fatima@gmail.com');
    
    // Find the password input field by its 'name' attribute and type the valid password
    cy.get('.flip-card__inner .flip-card__front input[name="password"]').type('fatima');
    
    // Logging the page's HTML to the console to ensure the button exists in the DOM (optional for debugging)
    cy.get('body').then(($body) => {
      console.log($body.html());  // Output the page's HTML for inspection
    });

    // Find the submit button using its class and ensure it is visible and clickable
    cy.get('.flip-card__inner .flip-card__front button.flip-card__btn', { timeout: 10000 })
      .should('exist')      // Check that the button exists in the DOM
      .should('be.visible') // Ensure the button is visible on the page
      .click();             // Simulate a click on the submit button

    // Check if the success toast message 'Logged in successfully!' appears on the page
    cy.contains('Logged in successfully!').should('be.visible');
  });

  /**
   * Test case for unsuccessful login with invalid credentials.
   * It ensures that the application correctly displays an error message for invalid credentials.
   */
  it('should show an error with invalid credentials', () => {
    // Find the email input field and type an invalid email
    cy.get('.flip-card__inner .flip-card__front input[name="email"]').type('invaliduser@example.com');
    
    // Find the password input field and type an incorrect password
    cy.get('.flip-card__inner .flip-card__front input[name="password"]').type('wrongpassword');

    // Find the submit button and simulate a click
    cy.get('.flip-card__inner .flip-card__front button.flip-card__btn', { timeout: 10000 })
      .should('exist')      // Ensure the button exists
      .should('be.visible') // Ensure the button is visible
      .click();             // Simulate a click on the button

    // Check if the error toast message 'Invalid credentials' is visible
    cy.contains('Invalid credentials').should('be.visible');
  });

  /**
   * Test case for empty fields submission.
   * It ensures that an appropriate error message is shown when the user submits the form without filling the required fields.
   */
  it('should show an error if fields are empty', () => {
    // Locate the "Confirm!" button (assuming this is the submit button for empty field validation) and click it
    cy.contains('button', 'Confirm!').click();

    // Check if the error message 'Please fill all the fields' is displayed
    cy.contains('Please fill all the fields').should('be.visible');
  });
});
