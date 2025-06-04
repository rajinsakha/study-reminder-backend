# Study Reminder Backend

A production-ready backend API for managing study reminders and tasks. This project is built with **Node.js**, **Express.js**, **TypeScript**, **Prisma**, **PostgreSQL**, and **JWT-based Authentication**. It follows best practices by separating concerns through dedicated folders for controllers, routes, validators, middleware, and types.

## Features

- **User Authentication:**
  - Secure user registration with email and password.
  - Password hashing with bcrypt.
  - JSON Web Token (JWT) authentication for subsequent requests.
  
- **Task Management:**
  - Create, retrieve, update, and delete tasks.
  - Tasks include title, description, due date and time, priority, and category.
  - Sort tasks based on due date/time (stored as a proper `DateTime`).

- **Validation & Error Handling:**
  - Request payload validation using `express-validator`.
  - Dedicated validator files and middleware for clean, modular validation.
  - Standardized error responses.

- **Database Integration:**
  - PostgreSQL database managed via Prisma ORM.
  - Database migrations for evolving schema.
  - Type-safe database access with automatically generated Prisma Client.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** express-validator
- **Other:** dotenv, cors, bcryptjs

## Prerequisites

- Node.js v14+ installed
- npm or Yarn installed
- PostgreSQL installed and running

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/study-reminder-backend.git
   cd study-reminder-backend
   ```

2. **Install Dependencies**

   Using npm:
   ```bash
   npm install
   ```
   Or using Yarn:
   ```bash
   yarn install
   ```

3. **Setup Environment Variables**

   Create a `.env` file in the project root with the following content:
   ```env
   PORT=3000
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
   JWT_SECRET="your_jwt_secret"
   ```
   Adjust these values to match your environment.

4. **Configure Prisma**

   Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```
   Run the initial migration to set up your database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the Server**

   Use your preferred starter script:
   ```bash
   npm run dev
   ```
   Or if using nodemon:
   ```bash
   nodemon src/server.ts
   ```
   The server will start on the port specified (default is 3000).

## Project Structure

A typical project layout is:

```
study-reminder-backend/
├── src/
│   ├── config/
│   │   └── db.ts              # Prisma Client initialization
│   ├── controllers/
│   │   └── auth.controller.ts # Business logic for authentication
│   ├── middleware/
│   │   └── validation.ts      # Middleware to process express-validator results
│   ├── routes/
│   │   └── auth.routes.ts     # Authentication endpoints
│   ├── validators/
│   │   └── auth.validator.ts  # Input validation rules for auth routes
│   ├── types/
│   │   └── auth.ts            # Custom TypeScript interfaces and types
│   └── server.ts              # Application entry point
├── prisma/
│   └── schema.prisma          # Prisma schema definition & migration files
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
- **Description:** Registers a new user.
- **Request Body Example:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourStrongPassword"
  }
  ```
- **Response:** Returns a JWT token if registration is successful.

#### POST `/api/auth/login`
- **Description:** Authenticates an existing user.
- **Request Body Example:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourStrongPassword"
  }
  ```
- **Response:** Returns a JWT token if login is successful.

> **Note:** The validation for these endpoints is done via dedicated validator files and middleware. Any validation errors return a proper error message with details.

### Task Management Endpoints

_Task management endpoints are protected with JWT-based authentication and are available in the Task Controller and Routes. Refer to those files for details on how to create, update, retrieve, and delete tasks._

## Development & Contributing

- **Validation Logic:**  
  Validation rules are placed under `src/validators` and are used by middleware in `src/middleware/validation.ts` to keep route files clean.

- **Graceful Shutdown:**  
  Consider adding graceful shutdown logic to disconnect from the database properly when your server stops (e.g., in `server.ts`).

- **Contributing:**  
  Contributions are welcome. Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please contact [your-email@example.com].
```

Simply save the above content as your `README.md`. Adjust repository URLs, contact info, and any other necessary details as needed. This file provides a comprehensive overview of the project, setup instructions, API usage, and development guidelines.

