# INSTRUCTIONS.md

## 📖 Prologue

This technical challenge consisted of building a microservices architecture to simulate a banking transaction validation system. The primary goal was to design a simple, scalable, and efficient system using the most appropriate tools.

The solution includes:

- ✨ **3 Microservices**:

  - **Authentication Service** (Auth) developed with **Koa.js**
  - **Anti-Fraud Validation Service** (Anti-Fraud) also developed with **Koa.js**
  - **Transaction Management Service** (Transaction) developed with **NestJS**

- ✨ **API Gateway**:

  - Built with **NestJS**
  - **GraphQL API** with interactive playground
  - Auto-generated schema with full type safety

The project supports transaction creation, antifraud validation, and user authentication through a modern GraphQL interface.

## 🛠️ How to Deploy

The main and easiest way to deploy the project is by running the following command:

```bash
docker-compose up -d
```

### ⚡ Prerequisites

- **Docker** installed
- **Docker Compose** installed (Linux users)
- **Docker Desktop** recommended (Windows users)

### 🛂 Containers Already Preconfigured

All services are already configured inside the `docker-compose.yml` file:

- PostgreSQL database
- Zookeeper and Kafka (for asynchronous event handling)
- Each microservice (Auth, Anti-Fraud, Transaction)
- API Gateway

**Important**:

- If you wish to change **environments** such as hostnames, database names, ports, etc., you can easily do it inside the `docker-compose.yml`.
- The microservices read their configuration via environment variables.

## 🎓 Test User Credentials

To login for testing purposes, you can use the following credentials:

- **Username:** `user.test`
- **Password:** `12345678`

## 🧪 Unit Testing

### 📊 Comprehensive Test Coverage

The project includes comprehensive unit tests for all microservices with clean code practices:

| Microservice        | Test Files | Total Tests | Coverage | Framework |
| ------------------- | ---------- | ----------- | -------- | --------- |
| **api-gateway-yape** | 8 files    | 16 tests    | 32.24%   | Jest + NestJS Testing |
| **ms-anti-fraud**   | 9 files    | 17 tests    | High     | Jest + Koa |
| **ms-auth**         | 12 files   | 24 tests    | High     | Jest + Koa |
| **ms-transaction**  | 8 files    | 36 tests    | 40.65%   | Jest + NestJS Testing |
| **TOTAL**           | **37 files** | **93 tests** | **Good** | **Jest Ecosystem** |

### 🚀 How to Run Unit Tests

#### **API Gateway (GraphQL)**
```bash
cd api-gateway-yape
npm install
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:cov            # Coverage report
```

#### **Anti-Fraud Microservice**
```bash
cd ms-anti-fraud
npm install
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:cov            # Coverage report
```

#### **Authentication Microservice**
```bash
cd ms-auth
npm install
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:cov            # Coverage report
```

#### **Transaction Microservice**
```bash
cd ms-transaction
npm install --legacy-peer-deps  # Required for dependency resolution
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:cov            # Coverage report
```

#### **Run All Tests at Once**
```bash
# From project root
for dir in api-gateway-yape ms-anti-fraud ms-auth ms-transaction; do
  echo "Testing $dir..."
  cd $dir && npm test && cd ..
done
```

### ✅ Test Features

- **Clean Code**: No unnecessary comments, following best practices
- **Smart Mocking**: Proper mocking strategies for external dependencies
- **Error Handling**: Tests for both success and error scenarios
- **Type Safety**: Full TypeScript integration
- **Windows Compatible**: Optimized for Windows development environment

## 🚀 Technical Approach

### ⚡ **UPDATED**: Migration to **GraphQL**

**Important Update**: The API Gateway has been **completely migrated from REST to GraphQL** to provide a more modern, flexible, and efficient API experience.

#### **Why GraphQL?**

After careful consideration, **GraphQL** was implemented for the following advantages:

| Feature                          | GraphQL Benefit                              | Implementation                         |
| -------------------------------- | -------------------------------------------- | -------------------------------------- |
| **Single Endpoint**              | One endpoint for all operations              | `/graphql` with queries and mutations  |
| **Flexible Data Fetching**       | Clients request exactly what they need      | Custom field selection                 |
| **Strong Type System**           | Auto-generated schema with full type safety | TypeScript + GraphQL decorators       |
| **Better Developer Experience**  | Interactive playground and documentation     | GraphQL Playground at `/graphql`      |
| **Modern Architecture**          | Clean Architecture with GraphQL layer       | Resolvers, Mappers, Interceptors      |

#### **GraphQL Operations Available:**

**Mutations:**
```graphql
# Authentication
mutation Login($input: LoginInput!) {
  login(input: $input) {
    code
    message
    data {
      token
    }
  }
}

# Create Transaction
mutation CreateTransaction($input: CreateTransactionInput!) {
  createTransaction(input: $input) {
    code
    message
    data {
      transactionExternalId
      transactionType { name }
      transactionStatus { name }
      value
      createdAt
    }
  }
}
```

**Queries:**
```graphql
# Get Transaction
query GetTransaction($transactionId: String!) {
  getTransaction(transactionId: $transactionId) {
    code
    message
    data {
      transactionExternalId
      transactionType { name }
      transactionStatus { name }
      value
      createdAt
    }
  }
}
```

#### **GraphQL Architecture Features:**

- ✅ **Clean Architecture**: API layer with Resolvers, Mappers, and DTOs
- ✅ **Global Interceptors**: Unified response format and error handling
- ✅ **Type Safety**: Full TypeScript integration with GraphQL
- ✅ **Auto Documentation**: Interactive schema exploration
- ✅ **Status Code Mapping**: Dynamic HTTP status codes based on operations

### 🔧 How to Test GraphQL API

#### **Access GraphQL Playground**
Once the services are running, you can access the interactive GraphQL playground at:
```
http://localhost:3000/graphql
```

#### **Sample Queries & Mutations**

**1. Login (Authentication)**
```graphql
mutation {
  login(input: {
    username: "user.test"
    password: "12345678"
  }) {
    code
    message
    data {
      token
    }
  }
}
```

**2. Create Transaction**
```graphql
mutation {
  createTransaction(input: {
    accountExternalIdDebit: "550e8400-e29b-41d4-a716-446655440000"
    accountExternalIdCredit: "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
    tranferTypeId: 1
    value: 100
  }) {
    code
    message
    data {
      transactionExternalId
      transactionType { name }
      transactionStatus { name }
      value
      createdAt
    }
  }
}
```

**3. Get Transaction**
```graphql
query {
  getTransaction(transactionId: "your-transaction-id") {
    code
    message
    data {
      transactionExternalId
      transactionType { name }
      transactionStatus { name }
      value
      createdAt
    }
  }
}
```

### 📚 Additional Documentation

For the original technical challenge instructions and requirements, please refer to:
📖 **[README-CHALLENGE.md](./README-CHALLENGE.md)** - Original challenge documentation

## 🏗️ Architecture Overview

### 🎯 Microservices Design Patterns

The project follows **Clean Architecture** principles with clear separation of concerns:

```
📁 Project Structure
├── 🚪 api-gateway-yape/     # GraphQL API Gateway (NestJS)
│   ├── src/modules/auth/    # Authentication module
│   ├── src/modules/transaction/ # Transaction module
│   └── test/               # Unit tests (16 tests)
├── 🔐 ms-auth/             # Authentication Service (Koa.js)
│   ├── src/application/    # Use cases & services
│   ├── src/domain/         # Business logic
│   ├── src/infrastructure/ # External adapters
│   └── test/              # Unit tests (24 tests)
├── 🛡️ ms-anti-fraud/       # Anti-fraud Service (Koa.js)
│   ├── src/application/    # Use cases & services
│   ├── src/domain/         # Business logic
│   ├── src/infrastructure/ # External adapters
│   └── test/              # Unit tests (17 tests)
├── 💰 ms-transaction/      # Transaction Service (NestJS)
│   ├── src/modules/        # NestJS modules
│   ├── src/shared/         # Shared utilities
│   └── test/              # Unit tests (36 tests)
└── 🐳 docker-compose.yml  # Container orchestration
```

### 🔄 Event-Driven Architecture

- **Kafka**: Asynchronous communication between microservices
- **PostgreSQL**: Persistent data storage
- **Docker**: Containerized deployment

### 🛠️ Technologies Used

| Component | Technology | Purpose |
|-----------|------------|---------|
| **API Gateway** | NestJS + GraphQL | Unified API interface |
| **Authentication** | Koa.js + JWT | User authentication |
| **Anti-Fraud** | Koa.js + Kafka | Transaction validation |
| **Transaction** | NestJS + Sequelize | Transaction management |
| **Database** | PostgreSQL | Data persistence |
| **Message Broker** | Kafka + Zookeeper | Event streaming |
| **Testing** | Jest + Supertest | Unit & integration tests |

## 😊 Final Thoughts

It has been a real pleasure working on this challenge. I am extremely motivated and enthusiastic to continue to the next steps and contribute with even more energy and commitment.

### 🌟 Project Highlights

- ✅ **Complete GraphQL Migration**: Modern API with interactive playground
- ✅ **Comprehensive Testing**: 93 unit tests across all microservices
- ✅ **Clean Architecture**: Maintainable and scalable codebase
- ✅ **Event-Driven Design**: Asynchronous microservices communication
- ✅ **Production Ready**: Docker containerization with proper configuration

Thank you for the opportunity! 🌟

---

**Jonathan Reyna**  
📧 Email: [jhonlpjr@gmail.com](mailto:jhonlpjr@gmail.com)  
🔗 GitHub: [https://github.com/jhonlpjr](https://github.com/jhonlpjr)

