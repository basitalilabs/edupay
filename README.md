# EduPay 🎓

A multi-tenant SaaS fee management system for educational institutes built with the MERN stack.

## Features
- Multi-institute support with complete data isolation
- Role-based access control (Admin / Accountant / Student)
- Student management with soft delete
- Fee structure templates per class
- Payment recording with paid/partial/unpaid status
- PDF Receipt generation with institute logo
- Fee Challan generation for bank payments
- Student portal to view own fees
- Automated overdue email reminders via cron job
- Analytics dashboard with last 6 months data
- Institute profile with logo upload via Cloudinary

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JWT, bcrypt
- **Email:** Resend
- **File Upload:** Cloudinary
- **PDF:** PDFKit
- **Deployment:** Vercel (client), Render (server), MongoDB Atlas

## API Endpoints

### Auth
- POST `/api/auth/register` — register institute + admin
- POST `/api/auth/login` — login

### Institute
- GET `/api/institute/profile` — get institute profile
- PUT `/api/institute/profile` — update profile with logo

### Staff
- POST `/api/staff/create` — create accountant or student account
- GET `/api/staff` — get all staff
- DELETE `/api/staff/:id` — delete staff

### Students
- POST `/api/students` — add student
- GET `/api/students` — get all students
- PUT `/api/students/:id` — update student
- DELETE `/api/students/:id` — soft delete student

### Fees
- POST `/api/fees/structure` — create fee structure per class
- POST `/api/fees/pay` — record payment
- GET `/api/fees/student/:id` — get student fee records
- GET `/api/fees/institute` — get all institute fees

### Receipt
- GET `/api/receipt/:feeRecordId` — download PDF receipt

### Challan
- POST `/api/challan/generate` — generate fee challan PDF
- GET `/api/challan/student/:id` — get student challans
- PUT `/api/challan/mark-paid/:id` — mark challan as paid

### Student Portal
- GET `/api/student-portal/fees` — student views own fees

### Dashboard
- GET `/api/dashboard` — get analytics and stats

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Resend account
- Cloudinary account

### Installation
```bash
git clone https://github.com/YOUR_USERNAME/edupay.git
cd edupay/server
cp .env.example .env
npm install
npm run dev
```

## Project Status
✅ Backend Complete — Frontend in progress

## License
MIT