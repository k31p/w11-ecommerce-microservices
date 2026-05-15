# Saga Orchestration E Commerce Microservices

Implementasi lengkap **Saga Orchestration Pattern**. Ini adalah pola untuk mengatur transaksi lintas layanan secara terpusat dengan **Circuit Breaker** sebagai mekanisme pemutus sementara saat layanan gagal, **Retry Logic** untuk mencoba ulang secara terukur, dan **Compensation Transactions** untuk membatalkan langkah yang sudah berhasil jika alur gagal di tengah.

## Arsitektur

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

## Layanan dan Port

| Layanan | Port | Peran |
|---------|------|-------|
| API Gateway | 3000 | Pintu masuk API publik |
| Orchestrator Service | 3001 | Pengatur alur Saga |
| Order Service | 3002 | Siklus hidup order |
| Inventory Service | 3003 | Pengelolaan stok |
| Payment Service | 3004 | Proses pembayaran |
| Shipping Service | 3005 | Proses pengiriman |

## Struktur Repository

```
api-gateway/
orchestrator-service/
order-service/
inventory-service/
payment-service/
shipping-service/
shared-library/
postgres-init/
```

## Teknologi

- NestJS sebagai framework backend
- TypeScript sebagai bahasa pemrograman
- Redis sebagai message broker
- PostgreSQL sebagai database per layanan
- Docker sebagai container runtime
- Docker Compose sebagai orkestrasi container lokal
- Yarn sebagai package manager

## Prasyarat

- Node.js versi 18 atau lebih baru
- Yarn versi 1.22.22
- Docker dan Docker Compose
- PostgreSQL hanya jika menjalankan tanpa Docker

Jika Yarn belum terpasang, gunakan Corepack:

```
corepack enable
corepack prepare yarn@stable --activate
```

## Pengembangan Lokal

### 1. Install dependencies

```
cd ecommerce

cd shared-library && yarn install
cd ../api-gateway && yarn install
cd ../orchestrator-service && yarn install
cd ../order-service && yarn install
cd ../inventory-service && yarn install
cd ../payment-service && yarn install
cd ../shipping-service && yarn install
```

### 2. Build shared library

API Gateway menggunakan tipe dari shared library. Build dulu sebelum build atau menjalankan API Gateway:

```
cd shared-library && yarn build
```

### 3. Build layanan

```
cd api-gateway && yarn build
cd ../orchestrator-service && yarn build
cd ../order-service && yarn build
cd ../inventory-service && yarn build
cd ../payment-service && yarn build
cd ../shipping-service && yarn build
```

### 4. Menjalankan layanan

Contoh menjalankan API Gateway:

```
cd api-gateway && yarn start:dev
```

## Docker

### Build dan jalankan semua layanan

```
docker compose up -d --build
```

### Health check

Health check adalah endpoint untuk melihat status layanan.

```
curl http://localhost:3000/api/v1/health
curl http://localhost:3001/saga/health
curl http://localhost:3002/api/v1/orders/health
curl http://localhost:3003/api/v1/inventory/health
curl http://localhost:3004/api/v1/payments/health
curl http://localhost:3005/api/v1/shipments/health
```

### Perbedaan build lokal dan Docker

- Lokal. Kamu bisa menggunakan Yarn link. Fitur ini menghubungkan package lokal agar perubahan langsung terbaca.
- Docker. Image API Gateway menyalin shared-library ke build environment lalu melakukan install dan build di dalam container. Tidak ada symlink yang digunakan.

## Environment Variables

Setiap layanan memiliki file `.env.example`. Salin menjadi `.env` dan sesuaikan nilainya:

- `api-gateway/.env.example`
- `orchestrator-service/.env.example`
- `order-service/.env.example`
- `inventory-service/.env.example`
- `payment-service/.env.example`
- `shipping-service/.env.example`

## Dokumentasi API

### API Gateway

#### Checkout Order

```
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

#### Cek status Saga

```
GET http://localhost:3000/api/v1/orders/saga/{saga_id}
```

### Orchestrator Service

#### Start Saga

```
POST http://localhost:3001/saga/start
Content-Type: application/json

{
  "saga_id": "uuid",
  "order_request": { ... }
}
```

#### Cek status Saga

```
GET http://localhost:3001/saga/{saga_id}/status
```

## Troubleshooting

### Docker build gagal dengan `getaddrinfo EAI_AGAIN registry.yarnpkg.com`

Ini adalah masalah DNS pada Docker. Coba salah satu opsi berikut:

```
docker build --network=host -f api-gateway/Dockerfile -t api-gateway .
```

Atau atur DNS Docker, contoh:

```
{
  "dns": ["1.1.1.1", "8.8.8.8"]
}
```

## Lisensi

MIT
