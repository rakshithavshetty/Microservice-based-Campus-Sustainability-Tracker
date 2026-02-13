# Resource Service

Resource Service for Campus Sustainability Tracker - provides access to campus resource data, sustainability articles, research papers, and videos.

## Features

- **Department Resources**: Campus department resource information (classrooms, labs, equipment)
- **Articles**: Sustainability articles and news
- **Research Papers**: Academic research on sustainability
- **Videos**: Educational sustainability videos
- **Health Check**: Service health monitoring

## API Endpoints

- `GET /resource/health` - Health check
- `GET /resource/departments` - Get all departments with resources
- `GET /resource/articles` - Get all sustainability articles
- `GET /resource/research-papers` - Get all research papers
- `GET /resource/videos` - Get all sustainability videos

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```
   PORT=5005
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASS=password
   MYSQL_DB=ecocampusdb
   ```

3. Set up the database:
   ```bash
   mysql -u root -p < data/database_setup.sql
   ```

4. Start the service:
   ```bash
   npm start
   ```

5. Access Swagger documentation at: http://localhost:5005/api-docs

## Project Structure

```
resource-service/
├── controllers/         # Request handlers
├── data/               # Database setup and data files
├── models/             # Sequelize models
├── routes/             # API routes
├── swagger/            # API documentation
├── server.js           # Main server file
└── package.json        # Dependencies and scripts
```

## Technologies

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL** - Database
- **Swagger** - API documentation
- **Eureka** - Service discovery

## Database Schema

### Departments Table
- id, name, classrooms, labs, fans, lights, computers, cabins, airConditioners

### Articles Table  
- id, title, url, category

### Research Papers Table
- id, title, url, category

### Videos Table
- id, title, url, category

## License

MIT License - see LICENSE file for details.