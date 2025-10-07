# Authentication Microservice - Yape Transactions Platform

## Description

Authentication and authorization microservice for the Yape transactions platform. Built with Koa, TypeScript, PostgreSQL, and JWT. Manages user authentication, token generation, and secret key validation.

## Features

- JWT token generation and validation
- User authentication with bcrypt password hashing
- Secret key validation for API access
- PostgreSQL database integration
- Clean Architecture with Inversify DI
- Comprehensive input validation

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Testing

```bash
# Unit tests
npm test

# Test coverage
npm run test:cov
```

## API Endpoints

- `POST /login` - User authentication and JWT token generation
- `POST /validate-token` - JWT token validation and payload extraction
- `POST /validate-secret-key` - Secret key validation for API access

## Architecture

- **Use Cases**: Business logic for authentication operations
- **Services**: Application layer coordination
- **Controllers**: HTTP request handling with Koa
- **Repository**: Data access layer with PostgreSQL
- **DTOs**: Request/response data validation

## Security Features

- Password hashing with bcrypt
- JWT tokens with configurable expiration (1h default)
- Input validation with class-validator
- SQL injection protection via parameterized queries

## Dependencies

This microservice integrates with:
- **PostgreSQL**: User data and credentials storage
- **API Gateway**: Provides authentication services
- **Other Microservices**: Token validation for authorization

---

**Developed by:** Jonathan Reyna Rossel  
**Email:** jhonlpjr@gmail.com  
**GitHub:** [@jhonlpjr](https://github.com/jhonlpjr)  
**Project:** Yape Technical Challenge - Node.js Microservices