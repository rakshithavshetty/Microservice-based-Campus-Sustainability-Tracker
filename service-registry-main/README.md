# Service Registry

This project provides a service registry for microservices using Netflix Eureka. It enables service discovery and registration, allowing microservices to locate each other dynamically in a distributed system.

## Features

- Eureka server for service registration and discovery
- Centralized dashboard to view registered services and their status
- Easy integration with Spring Boot microservices

## Requirements

- Java 17+
- Maven
- Other microservices configured as Eureka clients

## Setup

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd service-registry
   ```

2. **Build the project**
   ```sh
   mvn clean install
   ```

3. **Run the Eureka server**
   ```sh
   mvn spring-boot:run
   ```
   The server will start on port `8761` by default.

4. **Access the Eureka dashboard**

   Open your browser and go to:  
   [http://localhost:8761/](http://localhost:8761/)

5. **Register other services**

   Configure your microservices to register with Eureka by adding the following to their `application.properties`:
   ```properties
   eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
   spring.application.name=your-service-name
   ```

## Notes

- This project acts only as a registry and does not register itself as a client.
- All microservices that need to be discoverable should be configured as Eureka clients.