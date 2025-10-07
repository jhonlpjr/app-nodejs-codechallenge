# API Gateway - Yape Technical Challenge

## Description

GraphQL API Gateway for the Yape Technical Challenge. Built with NestJS and provides a unified interface for authentication and transaction operations.

## Features

- GraphQL API with Apollo Server
- Authentication management (JWT tokens)
- Transaction processing coordination
- Microservices communication via TCP
- Clean Architecture implementation

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Testing

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov
```

## GraphQL Endpoint

Once running, access the GraphQL playground at: `http://localhost:3000/graphql`

## Architecture

- **Resolvers**: Handle GraphQL queries and mutations
- **Services**: Business logic layer
- **Mappers**: Data transformation between layers
- **Guards**: Authentication and authorization
- **DTOs**: Data transfer objects for type safety

## Dependencies

This microservice communicates with:
- `ms-auth`: Authentication services
- `ms-transaction`: Transaction processing
- `ms-anti-fraud`: Fraud validation


**Developed by:** Jonathan Reyna Rossel  
**Email:** jhonlpjr@gmail.com  
**GitHub:** [@jhonlpjr](https://github.com/jhonlpjr)  
**Project:** Yape Technical Challenge - Node.js Microservices