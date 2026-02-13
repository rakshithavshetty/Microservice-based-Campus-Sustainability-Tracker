# API Gateway

This project provides an API Gateway for microservices using Spring Cloud Gateway and Netflix Eureka. It acts as a single entry point for client requests, routing them to the appropriate backend microservices and enabling features like CORS, load balancing, and centralized routing.

## Features

- Centralized API Gateway for all microservices
- Dynamic routing to backend services (user, report, analytics, event)
- CORS configuration for frontend integration
- Integration with Eureka for service discovery
- Easy extension for new microservices

## Requirements

- Java 17+
- Maven
- Eureka server running (service registry)
- Backend microservices running on their respective ports

## Setup

1. **Clone the repository**
	```sh
	git clone <repository-url>
	cd api-gateway
	```

2. **Build the project**
	```sh
	mvn clean install
	```

3. **Run the API Gateway**
	```sh
	mvn spring-boot:run
	```
	The gateway will start on port `8080` by default.

4. **Test the routes**

	Ensure your backend services are running on the following ports:
	- user-service: 5000
	- report-service: 5001
	- analytics-service: 5002
	- event-service: 5003
	- reward-service: 5004
	- resource-service: 5005

	You can test the routes using curl, Postman, or your browser:
	- http://localhost:8080/user/...
	- http://localhost:8080/report/...
	- http://localhost:8080/ml/...
	- http://localhost:8080/event/...
	- http://localhost:8080/reward/...
	- http://localhost:8080/resource/...

5. **Service Discovery**

	The API Gateway registers itself with Eureka and discovers other services via Eureka. Make sure your Eureka server is running and accessible at `http://localhost:8761/eureka`.

## Notes

- Update `application.yml` to add or modify routes as needed.
- Ensure all microservices are registered with Eureka for dynamic discovery.
- CORS is enabled for `http://localhost:3000` by default for frontend integration.