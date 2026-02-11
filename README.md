# HabitTracker

A full-stack web application for tracking daily habits and building positive routines. Built with Express.js, MongoDB, and React.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Frontend Setup](#frontend-setup)

## ✨ Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Habit Management**: Create, read, update, and delete habits
- **Habit Logging**: Track habit completion with timestamps
- **User Dashboard**: View all habits and their completion status
- **Protected Routes**: Secure endpoints with JWT middleware

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Chakra UI
- **State Management**: React hooks

## 📂 Project Structure

```
HabitTracker/
├── backend/
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middlewares/         # Express middlewares
│   ├── models/             # MongoDB schemas
│   ├── repositories/       # Data access layer
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env                # Environment variables
│
├── frontend/
│   └── habbit-tracker/
│       ├── src/
│       │   ├── pages/      # Page components
│       │   ├── components/ # Reusable components
│       │   ├── lib/        # Utility functions
│       │   ├── assets/     # Static assets
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── package.json
│       ├── vite.config.js
│       ├── tailwind.config.js
│       └── tsconfig.json
│
└── README.md
```

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (running locally or via cloud)

## 🚀 Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Install dotenv (if not already installed):
```bash
npm install dotenv
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend/habbit-tracker
```

2. Install dependencies:
```bash
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/test2

# JWT Secret Key
JWT_SECRET=your_secret_key_here

# Server Port
PORT=3000
```

**Important**: Replace `your_secret_key_here` with a strong, random secret key for production.

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:3000`. Update the API base URL in the frontend components if your backend runs on a different port.

## ▶️ Running the Application

### Start the Backend Server

```bash
cd backend

# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:3000`

### Start the Frontend Development Server

```bash
cd frontend/habbit-tracker

npm run dev
```

The frontend will run on `http://localhost:5173`

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password"
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}

Response:
{
  "token": "jwt_token",
  "user": { ... }
}
```

### Habit Endpoints

All habit endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

#### Create Habit
```
POST /api/habits
{
  "title": "Morning Exercise",
  "description": "30 minutes of running"
}
```

#### Get All Habits
```
GET /api/habits
```

#### Get Habit by ID
```
GET /api/habits/:habitId
```

#### Update Habit
```
PUT /api/habits/:habitId
{
  "title": "Morning Yoga",
  "description": "1 hour yoga session"
}
```

#### Delete Habit
```
DELETE /api/habits/:habitId
```

#### Log Habit (Mark as completed)
```
POST /api/habits/:habitId/log
{
  "date": "2024-02-11"
}
```

## 🎨 Frontend Components

- **Navbar**: Navigation component
- **HabitCard**: Display individual habit cards
- **HabitForm**: Form for creating/editing habits
- **TypeText**: Text animation component
- **TargetCursor**: Custom cursor component
- And more UI components in `ui/` folder

## 📝 Database Models

### User Model
- username
- email
- password (hashed)
- createdAt

### Habit Model
- userId (reference to User)
- title
- description
- createdAt
- updatedAt

### Habit Log Model
- habitId (reference to Habit)
- userId (reference to User)
- date
- completed
- createdAt

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Environment variables for sensitive data
- CORS configuration

---

**Last Updated**: February 2024
