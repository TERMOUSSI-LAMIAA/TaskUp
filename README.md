# 📌 TaskUp – Task Management Application

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

---    

TaskUp is a modern web application that allows users to manage their daily tasks through categories, tasks, and subtasks.  
Each user has a **personal secure space**, accessible only via authentication.

---

## 🚀 Technologies Used

### Frontend
- Vue.js (Vue 3)  
- Vite  
- Axios  
- TailwindCSS  

### Backend
- Node.js + Express.js  
- Prisma ORM  
- PostgreSQL  
- JWT (JSON Web Token)  
- bcrypt  
- multer (for image uploads)  
- Jest (unit & integration tests)  

---

## 📂 Project Structure

TaskUp/
├── backend/
│ ├── src/
│ ├── prisma/
│ ├── tests/
│ ├── package.json
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
└── README.md

---

## ⚙️ Installation & Configuration

### 1️⃣ Clone the project
```bash
git clone https://github.com/TERMOUSSI-LAMIAA/TaskUp.git
cd TaskUp
```

### 2️⃣ Backend Setup

📌 Install dependencies:
```bash
cd backend
npm install
```
📌 Configure environment variables:

Create a .env file inside backend/:
```bash
DATABASE_URL=
JWT_SECRET=
PORT=
```
📌 Start the backend development server:
```bash
npm run dev
```
### 3️⃣ Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
## 🔐 Main Features

### ✅ Authentication
- User registration
- Login / Logout
- JWT token authentication
- Update user profile

### 📁 Categories
- Create category
- Edit category
- Delete category

### 📝 Tasks
- Title & description
- Start & end date/time
- Priority & status
- Full CRUD operations

### ✔️ Subtasks
- Add subtasks
- Delete subtasks
- Mark as completed

### 🔍 Search & Filtering
- Search tasks by keyword
- Filter tasks by priority or status

## 🧪 Backend Testing

Run integration tests:
```bash
cd backend
npm run test
```
## 🧱 Backend Architecture (Express)

backend/src/
 ├── app.js
 ├── server.js
 ├── config/
 │    └── database.js
 ├── controllers/
 ├── middleware/
 ├── routes/
 ├── services/
 └── validators/

## ✨ Author & Contact

Name: Lamiaa Termoussi 
Email: lamiaa3105@gmail.com

Project completed as part of a web development internship:
TaskUp – Personal Task Management Application