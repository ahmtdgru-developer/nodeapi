# NestJS Blog API

NestJS, TypeORM, PostgreSQL ve Redis kullanan moduler bir REST API. Kullanici, post ve comment akislari JWT ile korunur; read endpoint'lerinde versioned Redis cache ve health endpointleri bulunur.

## Ozellikler

- JWT tabanli auth ve global guard yapisi
- `users`, `posts`, `comments` modullerinde CRUD akislari
- Swagger dokumantasyonu (`/api`)
- Redis backed cache-manager entegrasyonu
- `posts`, `users`, `comments` GET endpointlerinde versioned cache
- Cache hit/miss/write/error/invalidate metrikleri
- Health endpointleri: `live`, `ready`, `metrics`
- Docker ile PostgreSQL ve Redis calistirma destegi

## Teknolojiler

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Passport JWT](https://www.passportjs.org/packages/passport-jwt/)
- [Swagger](https://swagger.io/)

## Kurulum

### 1. Bagimliliklari yukle

```bash
npm install
```

### 2. Ortam degiskenlerini hazirla

`.env.example` dosyasini kopyalayip `.env` olustur:

```bash
cp .env.example .env
```

Ornek `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=node_api_db
DB_SYNC=false

JWT_SECRET=nest-secret-replace-me-in-production
JWT_EXPIRES_IN=1h

PORT=3000

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_URL=redis://localhost:6379

CACHE_TTL_MS=60000
POSTS_CACHE_TTL_MS=60000
USERS_CACHE_TTL_MS=60000
COMMENTS_CACHE_TTL_MS=30000
```

Notlar:

- `DB_SYNC=false` prod mantigi icin default olarak kapali.
- Cache TTL degerleri milisaniye cinsinden.
- Redis baglantisi `REDIS_URL` uzerinden yapiliyor.

### 3. PostgreSQL ve Redis'i Docker ile kaldir

```bash
docker-compose up -d
```

### 4. Uygulamayi calistir

Gelistirme:

```bash
npm run start:dev
```

Build alip calistirmak icin:

```bash
npm run build
node dist/main
```

## Auth Akisi

1. `POST /users` ile kayit ol
2. `POST /auth/login` ile token al
3. Korumali endpointlerde `Authorization: Bearer <token>` gonder

Varsayilan davranis:

- Tum route'lar korumali
- Sadece `@Public()` ile isaretlenen route'lar anonim erisime acik

## Cache Yapisi

Cache, `cache-manager + Redis + versioned key` mantigi ile calisir.

Temel prensip:

- Sadece GET endpointleri cache'lenir
- Cache key formati: `namespace:v{version}:{url}`
- Veri degisince ilgili namespace version'i artar
- Eski key'ler TTL dolana kadar Redis'te kalir ama artik kullanilmaz

Cache uygulanan endpointler:

- `GET /posts`
- `GET /posts/:id`
- `GET /users`
- `GET /users/:id`
- `GET /users/:id/public`
- `GET /comments`
- `GET /comments/:id`

Invalidation mantigi:

- `posts` degisirse: `posts`
- `users` degisirse: `users`, `posts`
- `comments` degisirse: `comments`, `posts`, `users`

Runtime guvenceleri:

- Redis read/write hata verirse API akisi bozulmaz
- Hata warning log olarak yazilir
- Sistem DB uzerinden cevap vermeye devam eder

## Health Endpointleri

- `GET /health/live`
  - process ayakta mi
- `GET /health/ready`
  - database ve Redis hazir mi
- `GET /health/metrics`
  - cache metrikleri ve stale cache stratejisi

Ornek `ready` cevabi:

```json
{
  "success": true,
  "data": {
    "status": "ready",
    "checks": {
      "database": "up",
      "redis": "up"
    }
  },
  "message": "Islem Basarili"
}
```

Ornek `metrics` alanlari:

- `hit`
- `miss`
- `write`
- `error`
- `invalidate`
- `hitRatio`

## Swagger

Uygulama calistiginda:

- Swagger UI: [http://localhost:3000/api](http://localhost:3000/api)

## Test ve Build

Unit test:

```bash
npm test -- --runInBand
```

Build:

```bash
npm run build
```

## Postman

Kok dizindeki [NestJS_API_Collection.postman_collection.json](./NestJS_API_Collection.postman_collection.json) dosyasini import ederek endpointleri test edebilirsin.

## Proje Yapisi

```text
src/
├── auth/           # login, jwt strategy, guard, decorator
├── comments/       # comments controller, service, dto, entity
├── common/
│   ├── cache/      # versioned cache, fallback, metrics
│   ├── filters/    # global exception filter
│   └── interceptors/
├── health/         # live, ready, metrics endpointleri
├── posts/          # posts controller, service, dto, entity
├── users/          # users controller, service, mapper, dto, entity
├── app.controller.ts
├── app.module.ts
└── main.ts
```

## Operasyon Notlari

- Prod ortaminda `DB_SYNC` kapali kalmali; migration tabanli yonetim tercih edilmeli.
- Redis cache hizlandirma katmanidir; tek dogruluk kaynagi veritabani olmaya devam eder.
- Cache hit/miss davranisini `GET /health/metrics` uzerinden izleyebilirsin.
