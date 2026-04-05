# 💰 Finance Tracker App

A full-stack **Finance Management Application** that allows users to track income and expenses with secure authentication and a modern UI.

---

## 🚀 Live Features

* 🔐 User Authentication (Register / Login with JWT)
* 📊 Dashboard Overview
* 💸 Add, Edit, Delete Financial Records
* 📄 Pagination Support
* 🎯 Role-Based Access Control (RBAC)
* 🎨 Clean & Responsive UI (Tailwind CSS)

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### 🔹 Backend

* Java
* Spring Boot
* Spring Security + JWT
* Spring Data JPA

### 🔹 Database

* PostgreSQL

---

## 📁 Project Structure

```
finance-tracker/
│
├── frontend/        # React App
│   ├── src/
│   └── package.json
│
├── backend/         # Spring Boot App
│   ├── src/
│   └── pom.xml
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```
git clone https://github.com/aditiz11/finance-tracker.git
cd finance-tracker
```

---

### 🔹 2. Backend Setup (Spring Boot)

```
cd backend
```

#### Configure Database

Update `application.properties`:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/finance_db
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

#### Run Backend

```
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

### 🔹 3. Frontend Setup (React)

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔐 Authentication Flow

```
Register → Login → Dashboard → Manage Records → Logout
```

* JWT Token stored in localStorage
* Protected routes using custom middleware
* Unauthorized users cannot access dashboard

---

## 📸 Screenshots

Register Page  <img width="1920" height="1020" alt="Screenshot 2026-04-05 221903" src="https://github.com/user-attachments/assets/a169971e-8582-48ae-8f9d-bed997755180" />
Login Page  <img width="1920" height="1020" alt="Screenshot 2026-04-05 221915" src="https://github.com/user-attachments/assets/8e4f5ede-d0f5-4ba5-9c4f-985f8023202d" /> 
DashBoard <img width="1920" height="1020" alt="Screenshot 2026-04-05 222117" src="https://github.com/user-attachments/assets/edfc7553-8472-4ad4-97b2-d9d0fe85fcbf" /> 
Records <img width="1920" height="1020" alt="Screenshot 2026-04-05 222052" src="https://github.com/user-attachments/assets/46fb3303-4344-42f2-94fa-ed976a1adbcd" />
---

## 📌 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Records

* `GET /api/records?page=0&size=10`
* `POST /api/records`
* `PUT /api/records/{id}`
* `DELETE /api/records/{id}`

---

## 🚀 Future Improvements

* 📊 Charts & Analytics (monthly spending)
* 🔍 Filters & Search
* 📱 Mobile Responsive Enhancements
* 🌐 Deployment (Frontend + Backend)
* 🔔 Toast Notifications

---


