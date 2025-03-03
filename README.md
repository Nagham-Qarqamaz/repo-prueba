# repo-prueba

This repository is a test repository.

## Application Overview

To take a look at the application, please check out this video:

[![Watch the video](https://img.youtube.com/vi/3_p-boncOEs/maxresdefault.jpg)](https://www.youtube.com/watch?v=3_p-boncOEs&ab_channel=NaghamQarqamaz)

## Project Structure

The repository consists of two main folders:
- `backend/` - Contains the Spring Boot project.
- `frontend/` - Contains the Angular project.

## Backend Configuration

The backend of this application utilizes a MySQL database. To ensure proper functionality, update the `backend/src/main/resources/application.properties` file in your Spring Boot project with the following database connection details:

```properties
spring.datasource.url=jdbc:mysql://localhost:Your_port/Your_schema_name
spring.datasource.username=Your_datasource_username
spring.datasource.password=Your_datasource_password
```

Ensure that MySQL is running and accessible at the specified port and schema name before starting the backend.

## Getting Started

### Prerequisites
- Java 17+
- MySQL Server
- Spring Boot
- Node.js & Angular CLI

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/repo-prueba.git
   ```
2. Navigate to the backend folder:
   ```sh
   cd repo-prueba/backend
   ```
3. Configure the database connection as mentioned above.
4. Build and run the backend application:
   ```sh
   mvn spring-boot:run
   ```
5. Open a new terminal and navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
6. Install dependencies and run the Angular application:
   ```sh
   npm install
   ng serve
   ```
