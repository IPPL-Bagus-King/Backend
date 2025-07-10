# 🧠 Forum Mahasiswa — Backend

Ini adalah backend dari aplikasi **Forum Mahasiswa**, sebuah platform diskusi edukatif yang dirancang untuk mahasiswa. Di platform ini, mahasiswa bisa bertukar pengetahuan dengan menjadi **tentor (mentor)** maupun **mentee**, serta membuat forum belajar mandiri.

Backend ini menangani manajemen pengguna, autentikasi, peran (role-based access), serta data forum, materi, dan ulasan melalui REST API.

## 👨‍💻 Tim Kami

* Gede Bagus Krishnanditya Merta  
* Valentino Hartanto  
* Raka Aditya Waluya  
* Cut Nabilah Nuur Azizah  

## 🛠️ Teknologi yang Digunakan (Backend)

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- JWT (JSON Web Token) for Authentication
- Multer (File Upload)
- dotenv
- Midtrans (Payment Gateway Integration)

## 🚀 Cara Menjalankan Project Ini

> Pastikan kamu sudah menginstall [Node.js](https://nodejs.org/) dan React CLI.

```bash
## 1. Clone repository ini
git clone https://github.com/IPPL-Bagus-King/Backend.git
cd Backend

# 2. Install semua dependency
npm install

# 3. Migrasi database
npx sequelize-cli db:migrate

# 4. Jalankan server backend
npm run dev


## ⚙️ Konfigurasi .env

Buat file `.env` di root folder backend dan isi dengan format berikut:

```env
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=mewing
DB_TEST_NAME=database_test
DB_PROD_NAME=database_production
DB_HOST=127.0.0.1

PORT=3000

JWT_SECRET=tes123

SERVER_KEY=SB-Mid-server-AKiBFXzYHcDEdO4QIbHthRZJ
CLIENT_KEY=SB-Mid-client-hui56D0DUmW4Me0Z


Buat file `.env` di root folder backend dan isi dengan format berikut:

-- Buka MySQL client, lalu jalankan perintah ini:
CREATE DATABASE mewing;

