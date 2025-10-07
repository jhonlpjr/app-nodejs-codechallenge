# Anti-Fraud Microservice - Yape Transactions Platform

## Description

Anti-fraud validation microservice for the Yape transactions platform. Built with Koa, TypeScript, and Inversify. Validates transaction amounts and prevents fraudulent activities through business rules.

## Features

- Transaction amount validation (max limit: 1000)
- Real-time fraud detection rules
- Kafka message processing for transaction events
- Clean Architecture with dependency injection
- Comprehensive logging and monitoring

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

- `POST /validate-transaction` - Validates transaction for fraud detection

## Architecture

- **Use Cases**: Business logic for transaction validation
- **Services**: Application layer coordination
- **Controllers**: HTTP request handling with Koa
- **Listeners**: Kafka event processing
- **Validators**: Input validation with class-validator

## Business Rules

- Maximum transaction amount: 1000
- Minimum transaction amount: > 0
- Invalid amounts (NaN, negative) are rejected

## Dependencies

This microservice integrates with:
- **Kafka**: For event-driven transaction processing
- **API Gateway**: Receives validation requests
- **Transaction Service**: Processes validated transactions

---

**Developed by:** Jonathan Reyna Rossel  
**Email:** jhonlpjr@gmail.com  
**GitHub:** [@jhonlpjr](https://github.com/jhonlpjr)  
**Project:** Yape Technical Challenge - Node.js Microservices