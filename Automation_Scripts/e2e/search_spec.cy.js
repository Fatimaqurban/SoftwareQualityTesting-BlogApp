// cypress/integration/search_spec.js

describe('Search Functionality', () => {
    // Before each test, visit the login page and log in
    beforeEach(() => {
      cy.visit('http://localhost:5173/login'); // Adjust this route based on your setup
      
      // Perform login action
      cy.get('.flip-card__inner .flip-card__front input[name="email"]').type('fatima@gmail.com'); // Type email
      cy.get('.flip-card__inner .flip-card__front input[name="password"]').type('fatima'); // Type password
      cy.get('.flip-card__inner .flip-card__front button.flip-card__btn').click(); // Click login button

      cy.contains('Logged in successfully!').should('be.visible'); // Verify login success

      // Ensure the login was successful by checking the homepage or a dashboard component
      cy.url().should('include', '/'); // Adjust based on your homepage route
    });
  
    it('should open the search modal when the search button is clicked', () => {
      cy.get('.search-button').click(); // Click the search button
      cy.get('.modal').should('be.visible'); // Check if the modal is visible
      cy.get('.search-input').should('be.visible'); // Ensure the search input field is visible
    });
  
    it('should close the search modal when the close button is clicked', () => {
      cy.get('.search-button').click(); // Open the search modal
      cy.get('.close-button').click(); // Close the search modal
    });
  
    it('should update the search text when typed into the search input', () => {
      const searchText = 'book'; // Example search term
      cy.get('.search-button').click(); // Open the search modal
      cy.get('.search-input').type(searchText); // Type in the search input
      cy.get('.search-input').should('have.value', searchText); // Verify the input field contains the typed text
    });
  
    it('should display search results after typing in search input and clicking the search button', () => {
      const searchText = 'Fashion'; // Example search term
      cy.get('.search-button').click(); // Open the search modal
      cy.get('.search-input').type(searchText); // Type in the search input
      cy.get('.modal-content').should('be.visible'); // Ensure search results modal is visible
      cy.get('.blog-item').should('have.length.greaterThan', 0); // Ensure at least one blog result is displayed
    });
  
    it('should display pagination controls', () => {
      cy.get('.search-button').click(); // Open the search modal
      cy.get('.pagination-items-amount').should('be.visible'); // Ensure items per page is visible
    //   cy.get('.pagination-items-nextprev').should('be.visible'); // Ensure pagination buttons are visible
    });
  
    // Our application does not support sorting until there is searched something before (FAILED)
    it('should sort search results when a sort option is selected', () => {
      const newSortValue = 'Title'; // New sort option to test
      cy.get('.search-button').click(); // Open the search modal
      cy.get('.select').select(newSortValue); // Select a new sort option
      cy.get('.select').should('have.value', newSortValue); // Verify the selected sort option
    });


    it('should handle pagination and display correct item counts after searching', () => {
        // Open the search modal
        cy.get('.search-button').click();
      
        // Enter a search term (e.g., 'f')
        cy.get('.search-input')
          .type('f')
          .should('have.value', 'f');
      
        // Verify that some blog items appear (assuming at least 3 results)
        // cy.get('.blog-item').should('have.length.at.least', 3);
      
        // Select 3 items per page
        cy.get('.pagination').last().within(() => {
          cy.get('select')
            .select('3')
            .should('have.value', '3');
        });
      
        // Verify that 3 blog items are displayed
        cy.get('.blog-item')
          .should('have.length.at.least', 3)
          .then(($items) => {
            cy.log(`Number of items found: ${$items.length}`);
          });
      
        // Verify the items count text
        cy.get('.pagination-items-amount .pagination-text')
          .first()
          .should('contain', 'ITEMS 1 - 3');
      
        // Select 5 items per page
        cy.get('.pagination').last().within(() => {
          cy.get('select')
            .select('5')
            .should('have.value', '5');
        });
      
        // Verify that 5 blog items are displayed
        cy.get('.blog-item')
        .should('have.length.at.least', 5)
        .then(($items) => {
            cy.log(`Number of items found: ${$items.length}`);
          });
      });

      
      

    it('should handle sorting options', () => {
        // Open the search modal
        cy.get('.search-button').click();
    
        // Ensure the search modal is visible
        cy.get('.modal').should('be.visible');
    
        // Select 'date desc' from the sorting dropdown
        cy.get('.sort-by select')
        .select('date desc')
        .should('have.value', 'date desc');
    
        // Verify that blog items are displayed
        cy.get('.blog-item').should('exist');
    
        // Select 'title' from the sorting dropdown
        cy.get('.sort-by select')
        .select('title')
        .should('have.value', 'title');
    
        // Verify that blog items are displayed again
        cy.get('.blog-item').should('exist');
    });
  
  

   
  });
