# 🍔 FoodFast Delivery (Microservices + React UI)

## 📌 Giới thiệu
FoodFast là một ứng dụng đặt đồ ăn trực tuyến với **kiến trúc microservices**.  
Dự án gồm:
- **Frontend**: React + Vite
- **Backend**: 4 dịch vụ Node.js (Express + MongoDB)
- **Triển khai**: Docker Compose (có thể nâng cấp Kubernetes)


## 📂 Cấu trúc Project

### Frontend (React UI)
<img width="590" height="755" alt="image" src="https://github.com/user-attachments/assets/f0a1ca1a-d8f2-4a83-8051-3e7570a2bdd3" />



### Backend
- **User Service** → quản lý tài khoản người dùng  
- **Product Service** → quản lý sản phẩm (món ăn)  
- **Order Service** → quản lý đơn hàng  
- **Payment Service** → xử lý thanh toán  

Mỗi service có MongoDB riêng → cách ly dữ liệu.

---

## ⚙️ Kiến trúc hệ thống
<img width="432" height="299" alt="image" src="https://github.com/user-attachments/assets/87dce520-8304-4006-879e-f7b749b140f3" />


- **Frontend**: React + Vite (hiển thị UI, gọi API qua Gateway)  
- **Backend**: Node.js + Express + MongoDB  
- **Triển khai**: Docker Compose (local) → Kubernetes (production)  
- **API Gateway**: Nginx/Kong/Traefik (gom API, auth, rate limiting)  

---

## 🚀 Các Service & API

### 🧑 User Service
- `POST /users` → tạo user  
- `GET /users/:id` → lấy thông tin user  
- `POST /auth/login` → đăng nhập  

### 🍔 Product Service
- `POST /products` → thêm sản phẩm  
- `GET /products` → danh sách sản phẩm  
- `GET /products/:id` → chi tiết sản phẩm  

### 📦 Order Service
- `POST /orders` → tạo đơn hàng  
- `GET /orders/:id` → chi tiết đơn hàng  

### 💳 Payment Service
- `POST /payments` → thực hiện thanh toán  
- `GET /payments/:id` → trạng thái thanh toán  

---

## 🐳 Docker Compose (tóm tắt)

```yaml
version: '3.8'
services:
  user-service:
    build: ./user-service
    ports: ["4001:4001"]
    environment:
      - MONGO_URL=mongodb://user-mongo:27017/users
    depends_on: [user-mongo]

  product-service:
    build: ./product-service
    ports: ["4002:4002"]
    environment:
      - MONGO_URL=mongodb://product-mongo:27017/products
    depends_on: [product-mongo]

  order-service:
    build: ./order-service
    ports: ["4003:4003"]
    environment:
      - MONGO_URL=mongodb://order-mongo:27017/orders
    depends_on: [order-mongo]

  payment-service:
    build: ./payment-service
    ports: ["4004:4004"]
    environment:
      - MONGO_URL=mongodb://payment-mongo:27017/payments
    depends_on: [payment-mongo]

  # MongoDB cho từng service
  user-mongo:
    image: mongo:5
    volumes: [ "user_data:/data/db" ]
  product-mongo:
    image: mongo:5
    volumes: [ "product_data:/data/db" ]
  order-mongo:
    image: mongo:5
    volumes: [ "order_data:/data/db" ]
  payment-mongo:
    image: mongo:5
    volumes: [ "payment_data:/data/db" ]

volumes:
  user_data:
  product_data:
  order_data:
  payment_data:

🖥 Frontend (React UI)
Công nghệ

React + Vite

Axios (gọi API)

React Router (navigation)

Zustand (state management giỏ hàng)

Các trang chính

Trang chủ → danh sách sản phẩm (Product Service)

Đăng ký/Đăng nhập → User Service

Giỏ hàng / Order → Order Service

Thanh toán → Payment Service

Quản trị → thêm/sửa sản phẩm

🛠 Dockerfile (React UI)
FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

📦 package.json (React UI)
{
  "name": "foodfast-ui",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.2",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.3",
    "vite": "^5.0.0"
  }
}
🔒 Bảo mật & Tối ưu

Auth: JWT

Password: bcrypt

API Gateway: gom API + rate limit

Monitoring: Prometheus + Grafana

Logging: Winston / Morgan

CI/CD: GitHub Actions → Docker build & deploy

Scale: Kubernetes (production)

📜 Hướng dẫn chạy
1️⃣ Chạy Backend
docker-compose up --build

2️⃣ Chạy Frontend (React UI)
cd foodfast-ui
docker build -t foodfast-ui .
docker run -p 5173:5173 foodfast-ui


Mở trình duyệt: http://localhost:5173
