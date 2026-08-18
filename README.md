# VIMES Inventory Receipt

Ứng dụng nhập phiếu nhập kho (Form 01-VT).

## Cấu trúc dự án

```
VIMES/
├── api/
│   ├── migrations/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── test/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   └── package.json
│
└── web/
    ├── public/
    ├── src/
    │   ├── components/receipt/
    │   ├── pages/
    │   ├── services/
    │   ├── types/
    │   ├── utils/
    │   ├── styles/
    │   ├── App.tsx
    │   └── main.tsx
    ├── .env.example
    └── package.json
```

## Cài đặt

**Yêu cầu hệ thống:** Node.js 20+, npm 10+, PostgreSQL 14+ (hoặc phiên bản tương thích)

### 1. Clone the repository

```bash
git clone https://github.com/hoangnmdev/vimes-test.git
cd vimes-test
```

### 2. Cài đặt dependencies

```bash
# Backend
cd api
npm install

# Frontend
cd ../web
npm install
```

## Cấu hình môi trường

Tạo file `api/.env`:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@localhost:5432/vimes
CORS_ORIGIN=http://localhost:5173
```

Ghi chú:

- Backend bắt buộc có `DATABASE_URL`.
- Frontend mặc định gọi API tại `http://localhost:3000/api/v1`.
- Nếu muốn đổi API URL cho frontend, set `VITE_API_URL` khi chạy web.

## Khởi tạo database (migration)

Trong thư mục `api/`:

```bash
npx node-pg-migrate up
```

Rollback 1 migration:

```bash
npx node-pg-migrate down
```

## Chạy dự án

Mở 2 terminal riêng:

### Chạy backend

```bash
cd api
npm run dev
```

API base URL: `http://localhost:3000/api/v1`

### Chạy frontend

```bash
cd web
npm run dev
```

Frontend URL: `http://localhost:5173`

## Chạy test

Trong thư mục `api/`:

```bash
npm test
```

Chạy kèm coverage (báo cáo đầy đủ theo từng file):

```bash
npm run test:coverage
```

![Báo cáo coverage](./docs/images/test-coverage-report.png)

## Build production

### Backend

```bash
cd api
npm run build
npm start
```

### Frontend

```bash
cd web
npm run build
npm run preview
```
