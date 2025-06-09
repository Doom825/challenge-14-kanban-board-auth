Kanban Board Application with JWT Authentication

Overview

This project is a full-stack Kanban board application that provides secure, role-based access to project tasks. It leverages JSON Web Tokens (JWT) for authentication, ensuring that only registered and logged-in users can view and manage tickets. The backend is built with Node.js, Express, Sequelize (PostgreSQL), and JWT, while the frontend uses React, Vite, and TypeScript.

Live Demo: [Your Frontend URL]

Table of Contents

Features

Technologies

Getting Started

Prerequisites

Installation

Environment Variables

Database Setup

Seed Data

Running Locally

Usage

Authentication Flow

API Endpoints

Project Structure

Contributing

License

Features

User Authentication: Secure login and logout using JWT stored in localStorage.

Protected Routes: Server-side middleware to protect API routes and client-side route guards.

Kanban Board: Create, read, update, and delete tickets across Swimlanes.

Role-Based Actions: Users can only modify their own tickets.

Responsive UI: Modern, responsive front-end built with React and Tailwind (or CSS).

Technologies

Frontend: React, TypeScript, Vite, React Router

Backend: Node.js, Express, Sequelize ORM, PostgreSQL

Authentication: JSON Web Tokens (JWT), bcrypt for password hashing

Tools: VS Code, Postman/Insomnia for API testing, Render for deployment

Getting Started

Prerequisites

Node.js v16+

npm or Yarn

PostgreSQL installed and running

Installation

Clone the repository

git clone https://github.com/YourUsername/challenge-14-kanban-board-auth.git
cd challenge-14-kanban-board-auth

Install dependencies

# Server
cd server
npm install

# Client
cd ../client
npm install

Environment Variables

Create a .env file in the server/ directory with the following variables:

DB_NAME=kanban_db
DB_USER=your_db_username
DB_PASSWORD=your_db_password
JWT_SECRET=your_secret_key_here

Keep your JWT_SECRET strong and do not commit this file to version control.

Database Setup

Create the database (as Postgres superuser):

createdb -U postgres -W kanban_db

Run migrations and seed data:

cd server
npx sequelize db:migrate
npm run seed

Running Locally

Start the backend

cd server
npm run dev

Start the frontend

cd client
npm run dev

Open: http://localhost:3000/login

Usage

Authentication Flow

Sign In: Navigate to /login and enter your credentials.

JWT Issuance: Upon successful login, the server returns a JWT token which is stored in localStorage under id_token.

Protected Routes: The client attaches the token in the Authorization header for API requests. Unauthenticated users are redirected to /login.

Sign Out: Clicking “Logout” clears the token and redirects to the login page.

API Endpoints

Method

Route

Description

Auth Required

POST

/auth/login

Authenticate user & receive JWT token

No

GET

/api/tickets

Get all tickets

Yes

POST

/api/tickets

Create a new ticket

Yes

PUT

/api/tickets/:id

Update an existing ticket

Yes

DELETE

/api/tickets/:id

Delete a ticket

Yes

Project Structure

challenge-14-kanban-board-auth/
├─ client/                # React frontend
│  ├─ src/
│  │  ├─ api/             # HTTP client modules
│  │  ├─ components/      # Reusable React components
│  │  ├─ pages/           # Route-level pages (Login, Board)
│  │  └─ utils/auth.ts    # AuthService for JWT operations
│  └─ vite.config.ts
├─ server/                # Express backend
│  ├─ src/
│  │  ├─ controllers/     # Route handlers
│  │  ├─ middleware/      # JWT authentication middleware
│  │  ├─ models/          # Sequelize models
│  │  ├─ routes/          # Mounted routes (auth, api)
│  │  └─ seeds/           # Seed data scripts
│  └─ config/database.js  # Sequelize config
└─ README.md              # Project documentation

Contributing

Fork the repository

Create a new branch: git checkout -b feature/YourFeature

Commit your changes: git commit -m "Add some feature"

Push to your branch: git push origin feature/YourFeature

Open a Pull Request

License

This project is licensed under the MIT License. See LICENSE for details.