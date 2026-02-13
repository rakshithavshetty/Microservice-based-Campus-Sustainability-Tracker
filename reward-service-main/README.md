# Reward Service

A microservice for managing campus sustainability rewards and achievements.

## Features

- Get all rewards
- Health check endpoint
- Swagger API documentation
- MySQL database integration
- Eureka service registration

## API Endpoints

- `GET /reward/health` - Health check
- `GET /reward/rewards` - Get all rewards
- `GET /api-docs` - Swagger documentation

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`

3. Start the service:
```bash
npm start
```

The service will run on port 5004 by default.

## Database Setup

Create the rewards table in MySQL:

```sql
CREATE TABLE rewards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(255) NOT NULL,
  title VARCHAR(500) NOT NULL,
  event TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Run the database setup script to populate with initial data:
```bash
mysql -u your_username -p your_database < data/database_setup.sql
```

If you have an existing rewards table without the title column, use the migration script:
```bash
mysql -u your_username -p your_database < data/add_title_column_migration.sql
```

## Swagger Documentation

Access the API documentation at: http://localhost:5004/api-docs