# NestJS Blog API - JWT Integration

Bu proje, NestJS, TypeORM ve PostgreSQL kullanılarak geliştirilmiş, kullanıcıların post paylaşıp yorum yapabildiği modüler bir REST API'dır.

## 🚀 Özellikler

- **Authentication (JWT):** Passport.js tabanlı, güvenli JWT kimlik doğrulama sistemi.
- **Kullanıcı Modülü:** CRUD işlemleri, profil detayları ve güvenli kayıt olma.
- **Post Modülü:** Post oluşturma, listeleme, detay görüntüleme ve soft-delete desteği.
- **Yorum Modülü:** Postlara yorum yapma ve yorum yönetimi.
- **Güvenlik Akışı:** "Secure-by-default" mimarisi (Tüm rotalar korumalı, `@Public()` ile istisnalar yönetilir).
- **Swagger:** JWT Bearer Auth destekli otomatik API dökümantasyonu (`/api` endpoint'i).
- **Docker:** Veritabanı (PostgreSQL) için docker-compose desteği.

## 🛠 Kullanılan Teknolojiler

- [NestJS](https://nestjs.com/) (v11+)
- [Passport / JWT](http://www.passportjs.org/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)

## 📋 Kurulum Adımları

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Çevresel Değişkenleri Ayarlayın
`.env` dosyasını oluşturun veya güncelleyin:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_NAME=node_api_db

JWT_SECRET=nest-secret-2026-senior-dev-security
JWT_EXPIRES_IN=1h
```

### 3. Veritabanını Başlatın (Docker)
```bash
docker-compose up -d
```

### 4. Uygulamayı Çalıştırın
```bash
npm run start:dev
```

## 🔐 Kimlik Doğrulama (Auth)

Uygulama genelinde JWT tabanlı koruma mevcuttur. 

1.  **Kayıt Ol:** `POST /users` endpoint'ini kullanarak yeni bir kullanıcı oluşturun.
2.  **Giriş Yap:** `POST /auth/login` endpoint'ine email ve password bilgilerinizi gönderin. Size bir `access_token` dönecektir.
3.  **Token Kullanımı:** Korumalı endpoint'lere istek atarken Header'da `Authorization: Bearer <token>` bilgisini gönderin.

## 📖 API Dökümantasyonu (Swagger)

Uygulama çalıştıktan sonra Swagger arayüzüne aşağıdaki adresten erişebilirsiniz:
`http://localhost:3000/api`

Swagger üzerinden test yapmak için sağ üstteki **"Authorize"** butonuna tıklayıp token'ınızı yapıştırmanız yeterlidir.

## 📬 Postman Koleksiyonu

Proje kök dizininde bulunan **`NestJS_API_Collection.postman_collection.json`** dosyasını Postman'e import ederek tüm akışları (Login sonrası otomatik token kullanımı dahil) test edebilirsiniz.

## 🏗 Proje Yapısı
```text
src/
├── auth/         # JWT Stratejileri, Guardlar ve Login işlemleri
├── users/        # Kullanıcı işlemleri, Mapper ve DTO yapısı
├── posts/        # Post işlemleri ve Entity-based serializer
├── comments/     # Yorum işlemleri
├── common/       # Interceptor, Filter ve ortak bileşenler
```
