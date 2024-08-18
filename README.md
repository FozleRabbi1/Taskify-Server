# This is a simple CRUD operation system back-end code 
## if You want to try it , you can clone the repository
* step 1 = at firse clone it
* step 2 = install all package use yarn add / npm i
* step 3 = create your own Database 
* step 4 = create a .env file in your root file ,,, set DATABASE_URL & PORT
* step 5 = connect postMan or other workshop
* 
## Note ( This Is A Module Pattern File System Code )
* If You Check the all CRUD operation Code , go to the Src + app + modules

## Features and Functionalities
### Product Management
- **Create Product:**
  - Adds a new product to the database using the provided product details.
- **Get All Products:**
  - Retrieves a list of all products from the database.
  - Returns the products in reverse order.
- **Update Product:**
  - Updates a specific product's details by its ID.
  - Allows partial updates to the product using provided data.
  - Ensures updated data is validated before saving.
- **Delete Product:**
  - Deletes a specific product from the database by its ID.

  
## Features and Functionalities
### User Management
- **Create User:**
  - Adds a new user to the database.
  - Checks if a user with the same email already exists before creating a new user.
- **Get All Users:**
  - Retrieves a list of all users from the database.
- **Update User Role:**
  - Updates the role of a specific user by their ID.
- **Delete User:**
  - Deletes a specific user from the database by their ID.

### Authentication
- **User Login:**
  - Authenticates a user using email and password.
  - Generates an access token and refresh token upon successful login.
- **Refresh Token:**
  - Generates a new access token using a valid refresh token.

### Error Handling
- **Custom Error Handling:**
  - Throws specific errors for various scenarios:
    - User already exists.
    - User not found.
    - Password mismatch.
    - Unauthorized access.

### JWT (JSON Web Token)
- **Token Creation:**
  - Generates JWT tokens (`accessToken` and `refreshToken`) with configurable expiration times.
- **Token Verification:**
  - Verifies and decodes JWT tokens using a secret key.


## Dependencies
- `bcrypt`
- `cookie-parser`
- `cors`
- `dotenv`
- `express`
- `http-status`
- `jsonwebtoken`
- `mongoose`
- `zod`




