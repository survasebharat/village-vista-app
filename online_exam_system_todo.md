# 📋 Village Online Exam System - Developer TODO List
**Website:** https://shivankhedkhurd.vercel.app/
**Created on:** 2025-10-31
**Prepared by:** Ramdas

---
## 🎯 Objective
Build a secure **Online Exam System** for Shivankhed Khurd village students (GK, Science, Math, English) that minimizes cheating, works on low internet, and generates detailed reports.

---

## 🧱 1. Core Modules

### 1.1 Student Registration
- Register with Name, Mobile Number, and Photo.
- OTP-based login (Firebase Auth or Twilio).
- Option to select subject (GK, Science, Math, English).
- Student Dashboard showing: Upcoming Exams, Past Scores, and Leaderboard.

### 1.2 Admin Panel
- Add/Edit/Delete questions with options.
- Upload via Excel or manual entry.
- Set exam schedule, duration, and total questions (default: 100).
- View reports and student performance analytics.

### 1.3 Exam Interface
- Display **one question at a time**.
- Shuffle questions and options per student.
- Disable copy-paste and screenshot (use JS restrictions).
- Auto-save answers as student progresses.
- Timer countdown (auto-submit when time expires).
- Camera snapshot at start and end of exam.
- Detect tab switch or screen minimize → show warning → 2nd time auto-submit.
- Integrity Pledge screen before starting exam.
- Mobile-friendly full-screen mode.

### 1.4 Question Management
- Each subject should have a large pool (300+ questions).
- Exam pulls **random 100** from the pool.
- Option to add explanation for answers (for post-exam learning).

### 1.5 Reports & Analytics
- Auto-generated score report (with % and total time).
- Export PDF report.
- Admin view: Student Rank, Accuracy, and Weak Topics.
- Public Leaderboard (Top 10 students per subject).

---

## 🔒 2. Anti-Cheating Features
- Random question & option shuffling.
- Disable multiple logins per student.
- No back navigation.
- Detect tab switch/app minimize.
- Camera verification snapshots.
- OTP login to prevent duplicate users.
- One attempt per exam.
- Timer auto-submit.

---

## 🌐 3. Technical Requirements
- Frontend: React.js / Next.js (as per current stack).
- Backend: Firebase / Supabase / Node.js.
- Database: Firestore or PostgreSQL.
- Hosting: Continue on Vercel.
- Responsive for mobile and desktop.
- Optional: PWA setup for offline caching (exam instructions).

---

## 💰 4. Revenue & Payment Integration
- Add Razorpay/UPI payment gateway for:
  - Premium quizzes (₹50–₹100 per attempt).
  - Business listings and sponsorships.
- Show QR Code for donations.
- Record transactions in Admin Panel.

---

## 🧮 5. Exam Rules Page
- Display before each exam:
  - "Do not switch tabs or take screenshots."
  - "Cheating will auto-submit your test."
  - "You must turn on your camera if asked."
- Require checkbox for agreement.

---

## 📊 6. Admin Reporting Dashboard
- Total students registered.
- Exams conducted and average scores.
- Filter by subject/date.
- Export to Excel or PDF.

---

## 🧰 7. Optional Advanced Features
- AI-based proctoring (face detection alerts).
- Offline exam mode with local sync.
- Push notification for upcoming exams.
- WhatsApp result sharing.

---

## 🎨 8. UI Notes
- Keep theme consistent with main site (shivankhedkhurd.vercel.app).
- Use Marathi + English bilingual labels.
- Clean, large fonts for rural accessibility.

---

## ✅ Deliverables
- New Route: `/exam`
- Sub-routes: `/register`, `/start`, `/report`, `/admin`
- Database Schema + API Docs
- Deployment on Vercel
- Admin login credentials setup
