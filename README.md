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
- **Yarn** - Package manager (v1.22.22)

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- Yarn 1.22.22
- Docker & Docker Compose
- PostgreSQL (if running locally)

### Local Development

```bash
# Clone the repository
cd ecommerce

# Install dependencies for all services
cd api-gateway && yarn install
cd ../orchestrator-service && yarn install
cd ../order-service && yarn install
cd ../inventory-service && yarn install
cd ../payment-service && yarn install
cd ../shipping-service && yarn install
cd ../shared-library && yarn install

# Build all services
cd api-gateway && yarn build
cd ../orchestrator-service && yarn build
# ... (repeat for all services)

# Or run in development mode (per service)
cd <service-directory> && yarn start:dev
```

### Using Docker

```bash
# Build and start all services
docker-compose up -d

# Check service health
curl http://localhost:3000/api/v1/health
curl http://localhost:3001/saga/health
# ... (check all services)

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Environment Variables

Each service has a `.env.example` file. Copy to `.env` and modify as needed:

- `api-gateway/.env.example`
- `orchestrator-service/.env.example`
- `order-service/.env.example`
- `inventory-service/.env.example`
- `payment-service/.env.example`
- `shipping-service/.env.example`

## 📝 API Documentation

### API Gateway (Port 3000)

#### Start Checkout

```bash
POST http://localhost:3000/api/v1/orders/checkout
Content-Type: application/json

{
  "user_id": "user-123",
  "items": [
    {
      "product_id": "product-456",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "total_amount": 59.98
}
```

#### Check Saga Status

```bash
GET http://localhost:3000/api/v1/orders/saga/{saga_id}
```

### Orchestrator Service (Port 3001)

#### Start Saga

```bash
POST http://localhost:3001/saga/start
Content-Type: application/json

{
  "saga_id": "uuid",
  "order_request": { ... }
}
```

#### Get Saga Status

```bash
GET http://localhost:3001/saga/{saga_id}/status
```

## 📝 License

MIT
