# 🚀 Saga Orchestration E-Commerce Microservices

Complete implementation of **Saga Orchestration Pattern** for e-commerce checkout flow with **Circuit Breaker**, **Retry Logic**, and **Compensation Transactions**.

## 📊 Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   API       │────▶│   Saga       │────▶│   Order      │
│   Gateway   │     │   Orchestrator│     │   Service    │
└─────────────┘     └──────────────┘     └──────────────┘
                           │                       │
                           ▼                       ▼
                    ┌──────────────┐     ┌──────────────┐
                    │   Inventory  │     │   Payment    │
                    │   Service    │     │   Service    │
                    └──────────────┘     └──────────────┘
                           │                       │
                           ▼                       ▼
                    ┌──────────────┐     ┌──────────────┐
                    │   Shipping   │     │              │
                    │   Service    │     │              │
                    └──────────────┘     └──────────────┘
```

## 🛠️ Technologies

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Redis** - Message broker for async communication
- **PostgreSQL** - Database for each service
- **Docker** - Containerization

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run with Docker
cd docker && docker-compose up -d

# Or run locally
npm run start:dev
```

## 📝 License

MIT
