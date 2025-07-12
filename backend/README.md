# Backend Documentation

This backend is built with Node.js and Express.js, providing RESTful APIs for a portfolio application. It manages users, projects, skills, messages, software applications, and timelines. The backend is structured for scalability and maintainability, with clear separation of concerns.

## Table of Contents
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Modules Overview](#modules-overview)
  - [Controllers](#controllers)
  - [Models](#models)
  - [Routes](#routes)
  - [Middlewares](#middlewares)
  - [Utils](#utils)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Running the Server](#running-the-server)

---

## Project Structure
```
backend/
  app.js                  # Express app setup
  server.js               # Server entry point
  package.json            # Project dependencies and scripts
  config/
    config.env            # Environment variables
  controller/             # Route handlers (controllers)
  database/
    dbConnection.js       # MongoDB connection logic
  middlewares/            # Custom Express middlewares
  models/                 # Mongoose schemas/models
  router/                 # Express route definitions
  utils/                  # Utility functions (JWT, email)
```

## Environment Variables
- `config/config.env` contains sensitive configuration such as database URI, JWT secret, email credentials, etc.

## Modules Overview

### Controllers (`controller/`)
- **messageController.js**: Handles message-related logic (CRUD for messages).
- **projectController.js**: Manages project data (CRUD for projects).
- **skillController.js**: Handles skills (CRUD for skills).
- **softwareApplicationController.js**: Manages software applications.
- **timelineController.js**: Handles timeline events.
- **userController.js**: Manages user authentication, registration, and profile.

### Models (`models/`)
- **messageSchema.js**: Mongoose schema for messages.
- **projectSchema.js**: Mongoose schema for projects.
- **skillSchema.js**: Mongoose schema for skills.
- **softwareApplicationSchema.js**: Mongoose schema for software applications.
- **timelineSchema.js**: Mongoose schema for timeline events.
- **userSchema.js**: Mongoose schema for users.

### Routes (`router/`)
- **messageRoutes.js**: API routes for messages.
- **projectRoutes.js**: API routes for projects.
- **skillRoutes.js**: API routes for skills.
- **softwareApplicationRoutes.js**: API routes for software applications.
- **timelineRoutes.js**: API routes for timeline events.
- **userRoutes.js**: API routes for user authentication and profile.

### Middlewares (`middlewares/`)
- **auth.js**: Authentication middleware (protects routes, checks JWT).
- **catchAsyncErrors.js**: Catches async errors in route handlers.
- **error.js**: Centralized error handler for Express.

### Utils (`utils/`)
- **jwtToken.js**: Utility for generating JWT tokens.
- **sendEmail.js**: Utility for sending emails (e.g., contact form, notifications).

## API Endpoints

### User
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/profile` - Get user profile (protected)

### Projects
- `GET /api/v1/projects` - List all projects
- `POST /api/v1/projects` - Create a new project
- `PUT /api/v1/projects/:id` - Update a project
- `DELETE /api/v1/projects/:id` - Delete a project

### Skills
- `GET /api/v1/skills` - List all skills
- `POST /api/v1/skills` - Add a new skill
- `PUT /api/v1/skills/:id` - Update a skill
- `DELETE /api/v1/skills/:id` - Delete a skill

### Messages
- `GET /api/v1/messages` - List all messages
- `POST /api/v1/messages` - Send a new message
- `DELETE /api/v1/messages/:id` - Delete a message

### Software Applications
- `GET /api/v1/software-applications` - List all software applications
- `POST /api/v1/software-applications` - Add a new software application
- `PUT /api/v1/software-applications/:id` - Update a software application
- `DELETE /api/v1/software-applications/:id` - Delete a software application

### Timeline
- `GET /api/v1/timeline` - List all timeline events
- `POST /api/v1/timeline` - Add a new timeline event
- `PUT /api/v1/timeline/:id` - Update a timeline event
- `DELETE /api/v1/timeline/:id` - Delete a timeline event

## Database
- Uses MongoDB as the database.
- Mongoose is used for schema definition and data modeling.
- Connection logic is in `database/dbConnection.js`.

## Running the Server
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up environment variables in `config/config.env`.
3. Start the server:
   ```sh
   npm start
   ```

---

## Contribution
- Follow best practices for code structure and commenting.
- Add comments to all new code for clarity.
- Use environment variables for sensitive data.

## License
This project is licensed under the MIT License.

---

For any questions or issues, please contact the repository owner.
