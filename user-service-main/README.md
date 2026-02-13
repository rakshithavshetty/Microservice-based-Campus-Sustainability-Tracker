# User Service

This service provides user management APIs for the Campus Sustainability Tracker platform. It handles user registration, authentication, profile management, and integrates with Eureka for service discovery. The service is built with Node.js, Express, Sequelize (MySQL), and includes Swagger UI for API documentation and testing.

## Features

- User registration with hashed passwords
- User login with JWT authentication
- Get, update, and delete user profiles
- Swagger UI for API documentation and testing
- Eureka client registration for microservice environments
- Environment-based configuration via `.env` file

## Requirements

- Node.js 16+
- MySQL database with the required tables
- Eureka server running (for service registration)

## Setup

1. **Clone the repository**

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root.

4. **Prepare the database**

   Ensure your MySQL database is running and contains the required tables.

5. **Run the service**
   ```
   npm start
   ```

6. **Access the API**

   - Health check: [http://localhost:5000/user/health](http://localhost:5000/user/health)
   - Swagger docs: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## API Endpoints

- `GET /user/health`  
  Health check endpoint.

- `POST /user/register`  
  Register a new user.

- `POST /user/login`  
  Login and receive a JWT token.

- `GET /user/:username`  
  Get user profile by username.

- `PUT /user/:username`  
  Update user profile.

- `DELETE /user/:username`  
  Delete user profile.

## Notes

- Passwords are securely hashed using bcrypt.
- JWT is used for authentication.
- The service registers itself with Eureka at startup.
- Swagger UI is available for interactive API testing.

## License

MIT