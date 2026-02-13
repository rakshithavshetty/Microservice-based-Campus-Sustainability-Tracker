🌱 Microservice-Based Campus Sustainability Tracker

📌 Project Description
The Microservice-Based Campus Sustainability Tracker is a distributed application developed to monitor, manage, and promote sustainability initiatives within a campus environment.
This system enables institutions to digitally manage sustainability efforts such as resource usage, green events, and eco-friendly participation.
The platform tracks environmental and engagement factors including:
⚡ Resource Consumption
🎉 Sustainability Events
🏆 Rewards & Participation
 📊 Analytics Insights
📄 Sustainability Reports


The application follows Microservices Architecture, where each module is deployed as an independent service, ensuring scalability, maintainability, and flexible deployment.
🏗️ Microservices Included
* User Service → Manages user registration, login & profiles
* Resource Service → Tracks sustainability resource usage
* Event Service → Manages sustainability events & campaigns
* Reward Service → Handles points, badges & leaderboards
* Analytics Service → Provides sustainability insights & metrics
* Report Service → Generates sustainability reports
* API Gateway → Single entry point for all services
* Service Registry (Eureka) → Service discovery & registration
* Campus Sustainability Tracker UI → React-based frontend dashboard


🛠️ Technologies Used
* Java (Spring Boot)
* Spring Cloud Gateway
* Eureka (Service Registry)
* Node.js / Express (Some services)
* React.js (Frontend UI)
* REST APIs
* MySQL
* Maven / npm
* Git & GitHub



📂 Project Structure
campus-sustainability-tracker/
│
├── api-gateway/
├── service-registry/
├── user-service/
├── resource-service/
├── event-service/
├── reward-service/
├── analytics-service/
├── report-service/
└── campus-sustainability-tracker-ui/



▶️ How to Run the Project

Follow the steps below to run the application:
1️⃣ Clone the Repository

bash
git clone https://github.com/your-username/campus-sustainability-tracker.git
cd campus-sustainability-tracker

2️⃣ Start Service Registry (Eureka)
bash
cd service-registry
mvn clean install
mvn spring-boot:run
Open:
http://localhost:8761

3️⃣ Start API Gateway

bash
cd ../api-gateway
mvn spring-boot:run

4️⃣ Run All Backend Microservices

Run each service in separate terminals.

Example:

bash
cd user-service
npm install
npm start

Repeat for:
* resource-service
* event-service
* reward-service
* report-service

(Use mvn spring-boot:run if the service is Spring Boot based.)

analytics-service
 # Install dependencies pip install -r requirements.txt
 # Run service python app.py

## 5️⃣ Start Frontend UI

bash
cd campus-sustainability-tracker-ui
npm install
npm start
Application runs on:
http://localhost:3000
 
6️⃣ Access Application via API Gateway
Gateway URL:
http://localhost:8080
Use Postman / Browser / Frontend UI to test APIs.




📊 Features
* Sustainability resource tracking
* Event & campaign management
* Reward & leaderboard system
* Analytics dashboards
* Automated report generation
* Centralized API Gateway routing
* Service discovery with Eureka
* Scalable microservices design



👩‍💻 Developed By
Rakshitha Shetty,
Sahana Priyanka RS,
Sanjana D Kotian,
Sabrina Hehar,
Major Project — Microservices Architecture


📜 License
This project is developed for academic and educational purposes.
