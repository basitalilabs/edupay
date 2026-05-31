<div align="center">

<img src="https://img.shields.io/badge/EduPay-Fee%20Management%20SaaS-2c3e50?style=for-the-badge&logoColor=white" alt="EduPay"/>

# EduPay — Smart Fee Management System

**A production-grade, multi-tenant SaaS platform for educational institutes built with the MERN stack.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-3498db?style=flat-square)](https://edupay.vercel.app)
[![Backend](https://img.shields.io/badge/API-Render.com-27ae60?style=flat-square)](https://edupay-api.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)
[![Node](https://img.shields.io/badge/Node.js-v18+-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)

</div>

---

## 📌 Overview

EduPay is a complete SaaS-level fee management system designed for schools, colleges, and academies. Each institute gets its own isolated environment with full data privacy. Administrators can manage students, define fee structures, record payments, generate PDF receipts and challans, and monitor collections through a real-time analytics dashboard.

> Built as a final web development project — but engineered to production standards.

---

## ✨ Features

### 🏢 Multi-Tenant SaaS Architecture
- Each institute operates as a completely independent tenant
- Data isolation enforced at the middleware level via `instituteId`
- One registration creates both institute and admin account instantly

### 🔐 Authentication & Role-Based Access
- JWT-based stateless authentication with 7-day token expiry
- Three roles: **Admin**, **Accountant**, **Student**
- Route-level authorization guards — roles enforced on every endpoint

### 👨‍🎓 Student Management
- Add, edit, soft-delete students with full data preservation
- Roll number uniqueness enforced per class per institute
- Search by name and filter by class

### 💰 Fee Management
- Create fee structures per class and academic year
- Record full, partial, or unpaid payments
- Admin can correct payment amounts if needed
- Automatic status tracking: Paid / Partial / Unpaid

### 🧾 PDF Receipt Generation
- Professional receipts with institute logo from Cloudinary
- Sequential receipt numbers per institute (REC-2026-0001)
- Downloadable anytime — student and admin access

### 📄 Fee Challan System
- Generate bank-ready fee challans before payment
- Sequential challan numbers per institute (CHN-2026-0001)
- Re-download unlimited times
- Mark challans as paid after bank submission

### 📊 Analytics Dashboard
- Real-time stat cards: total students, collected, pending dues, collection rate
- Last 6 months fee collection bar chart (Recharts)
- Current month breakdown: Paid / Partial / Unpaid counts

### 📧 Automated Email Reminders
- Daily cron job at 9:00 AM checks for overdue fees
- Sends professional HTML email reminders via Resend
- Fully automated — no manual intervention required

### 🏫 Institute Profile
- Upload and manage institute logo via Cloudinary
- Logo appears on all generated PDFs automatically
- Update name and address anytime

### 🌐 Public Landing Website
- Modern SaaS landing page with hero, features, pricing, testimonials
- Features, Pricing, About, and Contact pages
- Fully responsive — mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React.js + Vite | Single-page application |
| **Styling** | TailwindCSS | Utility-first responsive design |
| **Backend** | Node.js + Express.js | REST API server |
| **Database** | MongoDB + Mongoose | NoSQL document storage |
| **Auth** | JWT + bcryptjs | Stateless auth + password hashing |
| **File Storage** | Cloudinary | Institute logo cloud storage |
| **Email** | Resend | Transactional email delivery |
| **PDF** | PDFKit | Receipt and challan generation |
| **Scheduler** | node-cron | Automated daily reminders |
| **HTTP Client** | Axios | API requests with interceptors |
| **Charts** | Recharts | Analytics bar charts |
| **Deployment** | Vercel + Render.com | Frontend and backend hosting |
| **DB Hosting** | MongoDB Atlas | Managed cloud database |

---

## 📁 Project Structure

```
edupay/
├── client/                     ← React Frontend
│   └── src/
│       ├── api/                ← Axios instance with interceptors
│       ├── components/
│       │   └── landing/        ← Navbar, Footer components
│       ├── context/            ← AuthContext (global auth state)
│       ├── pages/
│       │   ├── landing/        ← Home, Features, Pricing, About, Contact
│       │   ├── Dashboard.jsx
│       │   ├── Students.jsx
│       │   ├── FeeStructure.jsx
│       │   ├── FeeRecords.jsx
│       │   ├── Staff.jsx
│       │   ├── Challan.jsx
│       │   ├── InstituteProfile.jsx
│       │   └── StudentPortal.jsx
│       └── App.jsx             ← Routes with protected route guards
│
└── server/                     ← Node.js Backend
    └── src/
        ├── config/             ← DB connection, Cloudinary setup
        ├── controllers/        ← Business logic (no try/catch)
        ├── middleware/         ← auth, asyncHandler, errorHandler
        ├── models/             ← Mongoose schemas
        ├── routes/             ← Express route definitions
        └── utils/              ← PDF generators, email templates, cron job
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)
- Resend account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/basitalilabs/edupay.git
cd edupay
```

### 2. Setup Backend

```bash
cd server
cp .env.example .env
npm install
```

Fill in your `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_random_secret_key
JWT_EXPIRE=7d
CLIENT_URI=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RESEND_API_KEY=your_resend_api_key
```

Start the backend:

```bash
npm run dev
```

> Server runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

> Frontend runs on `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register institute + admin |
| POST | `/api/auth/login` | Public | Login and receive JWT |

### Institute
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/institute/profile` | Admin | Get institute profile |
| PUT | `/api/institute/profile` | Admin | Update profile with logo |

### Students
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/students` | Admin, Accountant | Add new student |
| GET | `/api/students` | Admin, Accountant | Get all students (search + filter) |
| PUT | `/api/students/:id` | Admin, Accountant | Update student details |
| DELETE | `/api/students/:id` | Admin | Soft delete student |

### Staff
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/staff/create` | Admin | Create accountant or student account |
| GET | `/api/staff` | Admin | Get all staff members |
| DELETE | `/api/staff/:id` | Admin | Remove staff member |

### Fees
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/fees/structure` | Admin | Create fee structure per class |
| PUT | `/api/fees/structure/:id` | Admin | Update fee structure |
| DELETE | `/api/fees/structure/:id` | Admin | Delete fee structure |
| POST | `/api/fees/pay` | Admin, Accountant | Record student payment |
| PUT | `/api/fees/record/:id` | Admin | Correct payment amount |
| GET | `/api/fees/institute` | Admin, Accountant | Get all fee records with filters |
| GET | `/api/fees/student/:id` | Admin, Accountant | Get specific student fee records |
| GET | `/api/fees/structures` | Admin, Accountant | Get all fee structures |

### Receipt & Challan
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/receipt/:feeRecordId` | Admin, Accountant, Student | Download PDF receipt |
| POST | `/api/challan/generate` | Admin, Accountant | Generate and download challan PDF |
| GET | `/api/challan/student/:id` | Admin, Accountant, Student | Get student challans |
| PUT | `/api/challan/mark-paid/:id` | Admin, Accountant | Mark challan as paid |

### Dashboard & Portal
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/dashboard` | Admin | Analytics and stats |
| GET | `/api/student-portal/fees` | Student | View own fee records |
| POST | `/api/contact` | Public | Send contact form message |

---

## 👥 User Roles

| Role | Dashboard Access | Can Do |
|------|-----------------|--------|
| **Admin** | Full access | Everything — manage staff, institute profile, all data |
| **Accountant** | Partial | View students, record payments, generate challans |
| **Student** | Portal only | View own fees, download own receipts |

---

## 🔒 Security Features

- JWT tokens contain `userId`, `role`, and `instituteId` — no database lookup needed per request
- Passwords hashed with bcryptjs (10 salt rounds) — plain text never stored
- `asyncHandler` wrapper eliminates try/catch boilerplate in controllers
- Global error middleware handles Mongoose, JWT, and custom errors uniformly
- Every database query filtered by `req.instituteId` — tenants cannot access each other's data
- CORS restricted to whitelisted frontend origins only
- Sensitive credentials stored in `.env` — never committed to repository

---

## 🌍 Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://edupay.vercel.app |
| Backend | Render.com | https://edupay-api.onrender.com |
| Database | MongoDB Atlas | Managed cloud cluster |
| Storage | Cloudinary | CDN-backed media delivery |
| Email | Resend | Transactional email |

---

## 📋 Environment Variables

### Server `.env`

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE=7d
CLIENT_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
```

---

## 🤝 Contributing

This project follows the **Git Flow** branching strategy:

```bash
main          ← production only
develop       ← integration branch
feature/*     ← individual features
```

**Commit convention (Conventional Commits):**

```
feat: add PDF receipt generation
fix: fee calculation rounding error
chore: update dependencies
docs: update API documentation
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **Basit Ali** | Pakistan 🇵🇰

⭐ Star this repo if you found it helpful!

</div>