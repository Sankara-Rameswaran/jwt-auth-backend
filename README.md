# JWT Authentication Practice Backend

A backend authentication system built with Node.js, Express.js, MongoDB, and JSON Web Tokens (JWT). This project demonstrates secure user registration, login, password hashing, token generation, and protected routes using authentication middleware.

## Features

* User Registration
* User Login
* Password Hashing using bcrypt
* JWT Token Generation and Verification
* Protected Routes with Authentication Middleware
* MongoDB Integration using Mongoose
* Environment Variable Configuration
* RESTful API Design

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcryptjs
* dotenv
* cors

## Project Structure

```text
jwt-auth-practice/
│
├── config/
│   └── db.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── authRoutes.js
│
├── server.js
├── package.json
├── .env
└── package-lock.json
```

## Installation

### Clone the Repository

```bash
git clone https://github.com/Sankara-Rameswaran/jwt-auth-practice.git
cd jwt-auth-practice
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## API Endpoints

### Register User

```http
POST /register
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Login User

```http
POST /login
```

Request Body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "jwt_token_here"
}
```

### Protected Route

```http
GET /profile
```

Headers:

```http
Authorization: Bearer <jwt_token>
```

## Authentication Flow

1. User registers with email and password.
2. Password is hashed using bcrypt before storage.
3. User logs in with valid credentials.
4. Server generates a JWT token.
5. Client sends the token in the Authorization header.
6. Middleware verifies the token before granting access to protected resources.

## Testing

The APIs can be tested using:

* Postman
* Thunder Client
* Insomnia

## Learning Objectives

This project was built to understand:

* Authentication and Authorization
* JWT-based Security
* Password Hashing with bcrypt
* Express Middleware
* MongoDB and Mongoose
* REST API Development
* Environment Variable Management

## Future Improvements

* Refresh Tokens
* Role-Based Access Control (RBAC)
* Password Reset Functionality
* Email Verification
* OAuth Authentication (Google, GitHub)
* Swagger API Documentation

## Author

Sankara Rameswaran

MCA Student | MERN Stack Developer

GitHub: https://github.com/Sankara-Rameswaran

## License

This project is intended for learning and practice purposes.
