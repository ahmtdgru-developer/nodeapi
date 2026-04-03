# NestJS Blog API

Bu proje, NestJS, TypeORM ve PostgreSQL kullanılarak geliştirilmiş, kullanıcıların post paylaşıp yorum yapabildiği modüler bir REST API'dır.

## 🚀 Özellikler

- **Kullanıcı Modülü:** CRUD işlemleri, profil detayları.
- **Post Modülü:** Post oluşturma, listeleme, detay görüntüleme ve soft-delete desteği.
- **Yorum Modülü:** Postlara yorum yapma ve yorum yönetimi.
- **İlişkisel Yapı:** User -> Posts, User -> Comments, Post -> Comments (One-to-Many).
- **Swagger:** Otomatik API dökümantasyonu (`/api` endpoint'i).
- **Docker:** Veritabanı (PostgreSQL) ve Cache (Redis) için docker-compose desteği.
- **Mapper/DTO Pattern:** Temiz veri transferi ve modelleme.

## 🛠 Kullanılan Teknolojiler

- [NestJS](https://nestjs.com/) (v11+)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)

## 📋 Kurulum Adımları

### 1. Depoyu Klonlayın
```bash
git clone <repo-url>
cd nodeapi
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Çevresel Değişkenleri Ayarlayın
`.env.example` dosyasını `.env` olarak kopyalayın ve bilgileri güncelleyin:
```bash
cp .env.example .env
```

### 4. Veritabanını Başlatın (Docker)
Docker yüklü ise PostgreSQL ve Redis'i başlatmak için:
```bash
docker-compose up -d
```

### 5. Uygulamayı Çalıştırın
```bash
# Geliştirme modu (watch)
npm run start:dev

# Üretim modu
npm run build
npm run start:prod
```

## 📖 API Dökümantasyonu
Uygulama çalıştıktan sonra Swagger arayüzüne aşağıdaki adresten erişebilirsiniz:
`http://localhost:3000/api`

## 📬 Postman Koleksiyonu
Proje kök dizininde bulunan **`NestJS_API_Collection.postman_collection.json`** dosyasını Postman'e import ederek tüm endpoint'leri hemen test etmeye başlayabilirsiniz.

## 🏗 Proje Yapısı
```text
src/
├── users/        # Kullanıcı işlemleri, Mapper ve DTO yapısı
├── posts/        # Post işlemleri ve Entity-based serializer
├── comments/     # Yorum işlemleri
├── common/       # Interceptor, Filter ve ortak bileşenler
└── main.ts       # Uygulama giriş noktası ve Swagger kurulumu
```

## 📄 Lisans
Bu proje [UNLICENSED](LICENSE) olarak lisanslanmıştır.
