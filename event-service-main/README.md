# Event Service

This service provides RESTful APIs for managing campus sustainability events, such as environmental awareness days and sustainability initiatives. It is built with Node.js, Express, Sequelize, and registers itself as a Eureka client for service discovery.

## Features

- RESTful API endpoints for retrieving event data.
- Swagger UI for interactive API documentation.
- Eureka client registration for microservice environments.
- Environment-based configuration via `.env` file.

## Requirements

- Node.js (v14+ recommended)
- MySQL database with the required tables and data
- Eureka server running (for service registration)

## Setup

1. **Clone the repository**

2. **Install dependencies**
	 ```sh
	 npm install
	 ```

3. **Configure environment variables**

	 Create a `.env` file in the project root with your database and Eureka configuration.

4. **Prepare the database**

	 Ensure your MySQL database is running and contains the required tables. Example event data is available in the `data/` directory.

5. **Run the service**
	 ```sh
	 npm start
	 ```

6. **Access the API**

	 - Health check: [http://localhost:5003/event/health](http://localhost:5003/event/health)
	 - Swagger docs: [http://localhost:5003/api-docs](http://localhost:5003/api-docs)

## API Endpoints

- `GET /event/health`  
	Health check endpoint.

- `GET /event/events`  
	Returns all events.

## Notes

- The service registers itself with Eureka at startup for service discovery.
- Swagger UI provides interactive documentation for all endpoints.

## License

MIT
