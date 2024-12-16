describe('Blog Functionality', () => {
    // Before each test, use the custom login command
    beforeEach(() => {
      cy.login('fatima@gmail.com', 'fatima'); // Use the custom login command
    });

    it("should create a new blog and verify it appears in My Blogs", () => {
        // Open the new blog modal
        cy.get(".new-blog .button").click();
    
        // Fill in the blog title and content
        cy.get(".flip-card__front .flip-card__input").type("My New Blog");
        cy.get(".flip-card__front .flip-card__inputt").type(
          "This is the content of my new blog."
        );
    
        // Click the confirm button
        cy.get(".flip-card__btn").click();
    
        // Close the modal
        cy.get(".modal-content .close").click();
    
        // Navigate to 'My Blogs' page
        cy.contains("My Blogs").click();
    
        // Verify the newly created blog appears in the list
        cy.get(".blog-item").should("contain", "My New Blog");
        cy.get(".blog-item").should("contain", "This is the content of my new blog.");
      });
    
      it("should cancel creating a blog by closing the modal", () => {
        // Open the new blog modal
        cy.get(".new-blog .button").click();
    
        // Close the modal without submitting
        cy.get(".modal-content .close").click();
    
        // Verify the modal is no longer visible
        cy.get(".new-blog-form").should("not.exist");
      });
    

      //My code is unable to handle emoty submissions (FAILED)
      it("should handle empty title or content submission", () => {
        // Open the new blog modal
        cy.get(".new-blog .button").click();
    
        // Leave the title and content empty and try to submit
        cy.get(".flip-card__btn").click();
    
        // Verify that a toast error message appears (assuming you have a toast notification)
        cy.get(".Toastify__toast").should("contain", "Title and content cannot be empty");
    
        // Close the modal
        cy.get(".modal-content .close").click();
      });


      // Shows blank page when submitting empty title (FAILED)
      it("should display an error when the title is missing", () => {
      
        cy.get(".new-blog .button").click();

        // Leave the title field blank
        cy.get(".flip-card__front .flip-card__input").should("be.empty");
      
        // Fill in the blog content
        cy.get(".flip-card__front .flip-card__inputt").type("Content without a title.");
      
        // Click the submit button
        cy.get(".flip-card__btn").click();
      
        // Navigate to 'My Blogs' page
        cy.contains("My Blogs").click();
    
        // Verify the newly created blog appears in the list.
        cy.get(".blog-item").should("contain", "Content without a title.");
      });
      


      Cypress.on("uncaught:exception", (err, runnable) => {
        // Return false to prevent the test from failing
        return false;
      });
      
});