# VIMES Inventory Receipt

Ứng dụng nhập phiếu nhập kho (Form 01-VT) gồm:

- `api/`: Backend Node.js + Express + TypeScript + PostgreSQL
- `web/`: Frontend React + Vite + TypeScript

## Yêu cầu hệ thống

- Node.js 20+
- npm 10+
- PostgreSQL 14+ (hoặc phiên bản tương thích)

## 1) Cài đặt dependencies

```bash
# Backend
cd api
npm install

# Frontend
cd ../web
npm install
```

## 2) Cấu hình môi trường

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

## 3) Khởi tạo database (migration)

Trong thư mục `api/`:

```bash
npx node-pg-migrate up
```

Rollback 1 migration:

```bash
npx node-pg-migrate down
```

## 4) Chạy dự án

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

## 5) Chạy test

Trong thư mục `api/`:

```bash
npm test
```

Chạy kèm coverage:

```bash
npm run test:coverage
```

## 6) Build production

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
