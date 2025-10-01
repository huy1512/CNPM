# 🍔 FoodFast Delivery - Nền tảng Sàn giao dịch Đa đối tác

Chào mừng đến với FoodFast Delivery! Đây không chỉ là một ứng dụng đặt đồ ăn thông thường, mà là một hệ thống **Sàn giao dịch đa đối tác (Multi-Vendor Marketplace)** hoàn chỉnh được xây dựng trên kiến trúc **Microservices hướng sự kiện (Event-Driven)**.

Dự án này được thiết kế để có khả năng mở rộng, độ tin cậy cao và dễ dàng bảo trì, mô phỏng một hệ thống giao đồ ăn trong thế giới thực.

---

## ✨ Các Khái niệm Cốt lõi (Core Concepts)

Để hiểu rõ hệ thống, hãy nắm vững các nguyên tắc thiết kế sau:

* **Kiến trúc Microservices (12 services):** Hệ thống được chia thành 12 service độc lập, mỗi service chịu trách nhiệm cho một nghiệp vụ cụ thể (quản lý người dùng, sản phẩm, đơn hàng, giao hàng, v.v.).
* **Sàn giao dịch Đa đối tác (Multi-Vendor Marketplace):** Hỗ trợ 3 vai trò chính: **Người mua (Buyer)**, **Nhà bán hàng (Seller)**, và **Quản trị viên (Admin)**. Nhà bán hàng có thể tự quản lý cửa hàng, sản phẩm và đơn hàng của riêng mình.
* **Kiến trúc Hướng sự kiện (Event-Driven):** Các service giao tiếp với nhau một cách bất đồng bộ thông qua một **Message Broker** (như RabbitMQ/Kafka). Điều này giúp giảm sự phụ thuộc lẫn nhau (loose coupling) và tăng khả năng phục hồi của hệ thống.
* **Mô hình Saga Pattern:** Sử dụng cho các giao dịch phức tạp liên quan đến nhiều service (ví dụ: đặt hàng và thanh toán) để đảm bảo **tính nhất quán dữ liệu (data consistency)** mà không cần dùng đến các giao dịch phân tán (distributed transactions).

---

## ⚙️ Kiến trúc Hệ thống

Kiến trúc tổng thể được thiết kế để đảm bảo luồng dữ liệu đi qua các thành phần một cách tối ưu và an toàn.

![Kiến trúc hệ thống FoodFast Delivery](https://i.imgur.com/sY8EaXw.png)

1.  **Client (React App):** Người dùng (Buyer/Seller/Admin) tương tác với hệ thống thông qua giao diện người dùng.
2.  **API Gateway:** Là điểm vào duy nhất cho mọi yêu cầu. Nó chịu trách nhiệm **Xác thực (Authentication)**, **Phân quyền (Authorization - RBAC)**, giới hạn truy cập (Rate Limiting) và định tuyến request đến các service phù hợp.
3.  **Synchronous Services (REST API):** Các service xử lý các yêu cầu cần phản hồi ngay lập tức như quản lý người dùng, sản phẩm, giỏ hàng.
4.  **Asynchronous Services (Message Broker):** Các service xử lý các nghiệp vụ phức tạp như đặt hàng, thanh toán, điều phối giao hàng sẽ giao tiếp với nhau qua các sự kiện (events) trên Message Broker.
5.  **Databases:** Mỗi service có một cơ sở dữ liệu riêng để đảm bảo tính độc lập và cách ly dữ liệu.

---

## 🚀 12 Microservices Cốt lõi

Hệ thống được cấu thành từ 12 services độc lập:

| STT | Tên Service             | Vai trò chính                                                   |
| :-- | :---------------------- | :--------------------------------------------------------------- |
| 1   | **API Gateway** | Điểm truy cập duy nhất, xác thực JWT, định tuyến request.        |
| 2   | **User Service** | Quản lý Người mua (Buyer) và Admin.                              |
| 3   | **Seller Service** | Quản lý Nhà bán hàng/Nhà hàng (Seller/Shop).                     |
| 4   | **Product Service** | Quản lý menu và thông tin sản phẩm của từng shop.                |
| 5   | **Inventory Service** | Quản lý tồn kho suất ăn theo từng sản phẩm của từng shop.         |
| 6   | **Cart Service** | Quản lý giỏ hàng của người dùng.                                 |
| 7   | **Order Service** | Quản lý vòng đời đơn hàng, điều phối Saga, xử lý tách đơn hàng.    |
| 8   | **Payment Service** | Xử lý các nghiệp vụ thanh toán, xác nhận giao dịch.               |
| 9   | **Delivery Dispatcher** | Điều phối, tìm kiếm và phân công shipper/drone giao hàng.         |
| 10  | **Delivery & GPS Service** | Quản lý quy trình giao hàng, theo dõi GPS thời gian thực.        |
| 11  | **Message Broker** | Hệ thống hàng đợi tin nhắn (RabbitMQ/Kafka).                     |
| 12  | **Monitoring & Logging** | Thu thập log/metrics, giám sát và cảnh báo.                       |

---

## 🌊 Các Luồng Nghiệp vụ Chính (Key Flows)

1.  **Đăng ký & Xác thực (Onboarding):** Phân tách rõ ràng luồng đăng ký cho Người mua và Nhà bán hàng. Hệ thống sử dụng JWT để quản lý phiên làm việc và RBAC để phân quyền.
2.  **Quản lý Sản phẩm & Tồn kho:** Nhà bán hàng có thể đăng sản phẩm, cập nhật thông tin và số lượng tồn kho. Dữ liệu được cô lập theo `shopId` để đảm bảo an toàn.
3.  **Đặt hàng & Thanh toán (Saga Pattern):** Khi người mua đặt hàng (có thể từ nhiều shop), hệ thống sẽ:
    * Tạm giữ (reserve) tồn kho.
    * Kích hoạt một Saga, xuất bản sự kiện `OrderCreated`.
    * `Payment Service` lắng nghe và xử lý thanh toán.
    * Tùy vào kết quả thanh toán, `Order Service` sẽ xác nhận đơn hàng và trừ kho vĩnh viễn, hoặc hủy đơn và hoàn trả tồn kho.
4.  **Vận hành & Giao hàng:**
    * Khi đơn hàng được xác nhận, sự kiện `OrderConfirmed` được gửi đi.
    * `Delivery Dispatcher` nhận sự kiện, tìm shipper/drone và giao nhiệm vụ cho `Delivery & GPS Service`.
    * Người dùng có thể theo dõi vị trí đơn hàng theo thời gian thực qua WebSocket/SSE.

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

| Lĩnh vực            | Công nghệ                                     |
| :------------------ | :-------------------------------------------- |
| **Backend** | Node.js, Express.js, TypeScript               |
| **Frontend** | React, Vite, Zustand, Axios, React Router     |
| **Cơ sở dữ liệu** | MongoDB, PostgreSQL (tùy service)             |
| **Hạ tầng & DevOps** | Docker, Docker Compose, Kubernetes, Nginx (API Gateway) |
| **Message Broker** | RabbitMQ / Kafka                              |
| **Giám sát** | Prometheus, Grafana                           |
| **Logging** | Winston, Morgan                               |
| **CI/CD** | GitHub Actions                                |

---

## 🚀 Bắt đầu (Getting Started)

### 1. Yêu cầu

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên)
* [Docker](https://www.docker.com/) và [Docker Compose](https://docs.docker.com/compose/)

### 2. Cấu hình

Mỗi microservice có thể có một file `.env.example`. Hãy sao chép chúng thành `.env` và tùy chỉnh các biến môi trường nếu cần (ví dụ: port, chuỗi kết nối CSDL, secret keys).

```bash
# Ví dụ cho một service
cp .env.example .env
