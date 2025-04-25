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
  - API documented with **Swagger**

The project supports transaction creation, antifraud validation, and user authentication.

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

## 🚀 Technical Approach

### Why did we use **API REST** instead of **GraphQL**?

For this challenge, using **API REST** was the most suitable approach due to the nature of the operations:

| Requirement                                              | Solution     | Reason                                        |
| -------------------------------------------------------- | ------------ | --------------------------------------------- |
| CRUD-like operations (create, read, update transactions) | REST         | Natural and simple for single operations      |
| Independent Microservices                                | REST         | Clear separation of concerns                  |
| High concurrency with Kafka events                       | REST + Kafka | Direct mapping of events to RESTful endpoints |
| Authentication and Authorization per endpoint            | REST         | Simplified security handling                  |

Although **GraphQL** is an excellent technology, it would have unnecessarily complicated the architecture for this specific use case. GraphQL shines in scenarios where:

- You need to **combine multiple services' data** into a single, flexible query.
- Clients require **high customization** of the data they fetch (different fields for different apps).

In our case, the system needed clear, separated operations with straightforward communication, making **API REST** the most efficient and maintainable choice.

## 😊 Final Thoughts

It has been a real pleasure working on this challenge. I am extremely motivated and enthusiastic to continue to the next steps and contribute with even more energy and commitment.

Thank you for the opportunity! 🌟

---

**Jonathan Reyna**  
📧 Email: [jhonlpjr@gmail.com](mailto:jhonlpjr@gmail.com)  
🔗 GitHub: [https://github.com/jhonlpjr](https://github.com/jhonlpjr)

