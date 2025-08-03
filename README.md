# 📚 BlogHub — Fullstack Blog Platform

A modern, fullstack blog application built with **React + TypeScript** (Frontend) and **Node.js + Express + TypeScript** (Backend) using **MongoDB**. Experience seamless blogging with comprehensive user authentication, blog creation, and management features.

**GitHub Repository:** [https://github.com/tiru-2001/blog_repo](https://github.com/tiru-2001/blog_repo)

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [https://blog-repo-alpha.vercel.app](https://blog-repo-alpha.vercel.app) |
| **Backend API** | [https://blog-repo-y5r0.onrender.com/api](https://blog-repo-y5r0.onrender.com/api) |
| **Health Check** | [https://blog-repo-y5r0.onrender.com/health](https://blog-repo-y5r0.onrender.com/health) |

---

## 📂 Project Structure

```
blog-repo/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── repository/
│   │   ├── routes/
│   │   ├── service/
│   │   ├── types/
│   │   ├── utils/
│   │   └── server.ts
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   └── index.html
│
├── .env
└── .gitignore
```

---

## ⚙️ Setup Instructions

### 📥 1️⃣ Clone the Repository

```bash
git clone https://github.com/tiru-2001/blog_repo.git
cd blog-repo
```

### 🛠️ 2️⃣ Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create a .env file with:
PORT=8500
MONGO_URI=<YOUR_MONGODB_URI>
JWT_ACCESS_SECRET=<YOUR_ACCESS_SECRET>
JWT_REFRESH_SECRET=<YOUR_REFRESH_SECRET>

# Start the server
npm start

# OR build for production and serve:
npm run build && npm run serve
```

### 🌐 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create a .env file:
VITE_API_URL=http://localhost:8500/api

# Start the dev server
npm start
```

---

## 🚀 Features

- User authentication (Register, Login, Logout)
- Create, read, update, and delete blog posts
- Responsive design with React and TypeScript
- RESTful API with Node.js, Express, and TypeScript
- MongoDB integration for data storage

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login user |
| `POST` | `/api/auth/logout` | Logout user |
| `GET` | `/api/auth/status` | Check user status |
| `POST` | `/api/auth/refresh` | Refresh tokens |
| `GET` | `/api/blogs` | Get all blogs |
| `POST` | `/api/blogs` | Create a new blog |
| `GET` | `/api/blogs/:id` | Get single blog by ID |
| `PATCH` | `/api/blogs/:id` | Update blog by ID |
| `DELETE` | `/api/blogs/:id` | Delete blog by ID |
| `GET` | `/api/users/me` | Get user profile |

✔️ **Health Check:** [https://blog-repo-y5r0.onrender.com/health](https://blog-repo-y5r0.onrender.com/health)  
✔️ **Example Login:** [https://blog-repo-y5r0.onrender.com/api/auth/login](https://blog-repo-y5r0.onrender.com/api/auth/login)

---

## 📄 Pages

### Home
Displays a list of all blogs and a welcome message.

![Home Page](https://github.com/user-attachments/assets/4a364384-f340-484e-b842-06d11bc50849)

### Register
Allows new users to create an account.

![Register Page](https://github.com/user-attachments/assets/13e126e6-abaf-4716-bef8-7eb4d0eaf3cb)

### Login
Enables users to log in to their accounts.

![Login Page](https://github.com/user-attachments/assets/50a028be-943b-45d4-b6b6-3d0dcf73adeb)

### Blog Detail
Shows the full content of a single blog post.

![Blog Detail](https://github.com/user-attachments/assets/cacea495-9181-4c93-a954-e0ecd65251f8)

### Profile
Displays user profile information, including personal details and authored blogs.

![Profile Page](https://github.com/user-attachments/assets/d7e9d508-d288-46be-a2ce-a2eff4ab3969)

### Edit
Allows users to edit an existing blog post.

![Edit Blog](https://github.com/user-attachments/assets/511efc5e-3e66-40d1-9a3d-c5e5705c985c)

### Create
Provides a form to create a new blog post.

![Create Blog](https://github.com/user-attachments/assets/087ed53c-3f06-42a1-8d55-fe1052f4479e)

---
