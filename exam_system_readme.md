# 📚 Exam System Documentation

## Overview
The Shivankhed Khurd Online Exam System is a comprehensive platform for conducting secure online examinations for students. It includes admin capabilities for question management, exam configuration, and result tracking.

---

## 🎯 Features

### For Students
- ✅ View active exams by subject (GK, Science, Math, English)
- ✅ Take exams with timer and auto-submit
- ✅ Camera-based integrity verification (photos at start & end)
- ✅ One question at a time display with navigation
- ✅ Instant results with detailed explanations
- ✅ View past exam performance and leaderboard
- ✅ Browser notifications for upcoming exams

### For Administrators
- ✅ Bulk question upload (CSV, XLSX, JSON)
- ✅ Manual question entry with preview
- ✅ Question categorization (Subject, Class, Topic, Marks)
- ✅ Create & configure exams (duration, pass marks, total marks)
- ✅ Activate/Deactivate exams
- ✅ View all student results with analytics
- ✅ Download results as Excel with complete details
- ✅ Track participation rates and performance trends

---

## 👤 Admin Credentials

**For testing purposes:**

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shivankhed.com | Admin@123 |
| Gramsevak | gramsevak@shivankhed.com | Gramsevak@123 |

**Note:** Please change these credentials in production environment.

---

## 📤 How to Upload Questions

### Method 1: Bulk Upload (CSV/XLSX)

1. Navigate to **Admin Panel → Exam Management**
2. Select an exam and click **Questions**
3. Click **Bulk Import** button
4. Download the template file
5. Fill in the template with your questions:

**Required Columns:**
- `question` - The question text
- `option_a` - Option A
- `option_b` - Option B
- `option_c` - Option C
- `option_d` - Option D
- `correct_option` - Must be A, B, C, or D
- `class` - Grade level (e.g., "7th Standard")
- `topic` - Topic/Chapter name
- `marks_per_question` - Marks for this question (default: 1)
- `explanation` - Optional explanation for learning
- `difficulty` - easy, medium, or hard (optional)

6. Upload the completed file
7. Preview and confirm the import

**Example Row:**
```csv
question,option_a,option_b,option_c,option_d,correct_option,class,topic,marks_per_question,explanation,difficulty
"What is the capital of India?","Mumbai","New Delhi","Kolkata","Chennai","B","7th Standard","Geography",1,"New Delhi is the capital of India",easy
```

### Method 2: Bulk Upload (JSON)

Upload a JSON file with the following structure:

```json
[
  {
    "question": "What is the capital of India?",
    "options": ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    "answer": "New Delhi",
    "topic": "Geography",
    "class": "7th Standard",
    "marks": 1
  }
]
```

### Method 3: Manual Entry

1. Go to **Exam Questions** page
2. Click **Add Question** button
3. Fill in the form:
   - Question text
   - Four options (A, B, C, D)
   - Select correct option
   - Choose subject, class, and topic
   - Set marks per question
   - Add explanation (optional)
   - Select difficulty level
4. Click **Submit**

---

## 🎓 Sample Student Accounts

For testing exam submissions and results:

| Name | Mobile | Email | Class | Roll No |
|------|--------|-------|-------|---------|
| Ravi Patil | 9898989898 | ravi.patil@student.com | 7 | 1 |
| Sneha Shinde | 9876543210 | sneha.shinde@student.com | 7 | 2 |
| Ajay Pawar | 9090909090 | ajay.pawar@student.com | 7 | 3 |
| Priya Jadhav | 9123456789 | priya.jadhav@student.com | 7 | 4 |

**Default Password for all students:** Student@123

---

## 🔧 Creating & Configuring Exams

### Step 1: Create Exam
1. Go to **Admin → Exam Management**
2. Click **Create Exam**
3. Fill in exam details:
   - **Title**: Name of the exam
   - **Subject**: GK, Science, Math, or English
   - **Description**: Brief description (optional)
   - **Total Questions**: Number of questions (default: 100)
   - **Duration**: Time in minutes (default: 60)
   - **Pass Marks**: Minimum marks to pass (default: 40)
   - **Scheduled At**: Start date and time
   - **Ends At**: End date and time
   - **Status**: Draft, Scheduled, Active, Completed, or Cancelled

4. Click **Create Exam**

### Step 2: Add Questions
1. Click **Questions** button for the exam
2. Add questions using any method (bulk upload or manual)
3. Questions will be randomly selected during exam

### Step 3: Configure Settings
- **Total Marks**: Auto-calculated from question marks
- **Pass Marks**: Set minimum passing score
- **Duration**: Set time limit in minutes
- **Is Active**: Toggle to activate/deactivate exam

### Step 4: Activate Exam
1. Change status to **Active** or **Scheduled**
2. Set **Is Active** to true
3. Students can now see and attempt the exam

---

## 📊 How Result Calculation Works

### Scoring System
- ✅ **Correct Answer**: +1 mark (or custom marks per question)
- ❌ **Wrong Answer**: 0 marks (no negative marking)
- ⚠️ **Unanswered**: 0 marks (treated as incorrect)

### Result Components
```javascript
Total Marks = Sum of all question marks
Obtained Score = Sum of marks for correct answers
Percentage = (Obtained Score / Total Marks) × 100
Pass/Fail = Score >= Pass Marks ? "Pass" : "Fail"
```

### Example Calculation
```
Total Questions: 100
Marks per Question: 1
Total Marks: 100
Pass Marks: 40

Student Performance:
Correct Answers: 75
Wrong Answers: 20
Unanswered: 5

Score = 75 marks
Percentage = (75/100) × 100 = 75%
Result = Pass (75 >= 40)
```

---

## 📥 Downloading Excel Results

### Step 1: Navigate to Results
1. Go to **Admin Panel → Exam Management**
2. Select an exam
3. Click **View Results** or go to **Exam Analytics**

### Step 2: Download Excel
1. Click **Download Results** button
2. Excel file will be generated with following columns:

| Column | Description |
|--------|-------------|
| Student Name | Full name from profile |
| Email | Student email address |
| Mobile No | Contact number |
| Roll No | Student roll number |
| Class | Grade/Class level |
| Score | Marks obtained |
| Total Marks | Maximum marks |
| Percentage | Score percentage |
| Correct Answers | Number of correct answers |
| Wrong Answers | Number of wrong answers |
| Unanswered | Questions not attempted |
| Time Taken | Duration in minutes |
| Exam Date | Date and time of attempt |
| Status | Pass/Fail based on pass marks |

### Step 3: Excel Features
- Auto-formatted headers
- Color-coded pass/fail status
- Sortable columns
- Filter options
- Formula-based calculations
- Ready for printing

---

## 🔒 Security Features

### Integrity Measures
1. **Camera Verification**: Photos captured at exam start and end
2. **One Attempt Only**: Each student can attempt exam once
3. **Time-bound**: Auto-submit when time expires
4. **Tab Switch Detection**: Warning on switching tabs (optional feature)
5. **Integrity Pledge**: Students must accept before starting
6. **Session Tracking**: All activities logged with timestamps

### Data Protection
- Secure authentication with JWT tokens
- Row Level Security (RLS) on database
- Encrypted photo storage
- HTTPS-only communication
- Admin-only access to sensitive data

---

## 🛠 API Endpoints

### Exams
```typescript
// Get all active exams
GET /rest/v1/exams?is_active=eq.true&status=in.(scheduled,active)

// Create new exam (Admin only)
POST /rest/v1/exams
Body: { title, subject, description, total_questions, duration_minutes, pass_marks, ... }

// Update exam
PATCH /rest/v1/exams?id=eq.{exam_id}
Body: { status, is_active, ... }

// Delete exam (Admin only)
DELETE /rest/v1/exams?id=eq.{exam_id}
```

### Questions
```typescript
// Get questions for exam
GET /rest/v1/exam_questions?exam_id=eq.{exam_id}

// Add question
POST /rest/v1/exam_questions
Body: { exam_id, subject, question, option_a, option_b, option_c, option_d, correct_option, class, topic, marks_per_question, ... }

// Bulk insert questions
POST /rest/v1/exam_questions
Body: [{ ... }, { ... }, ...]

// Update question
PATCH /rest/v1/exam_questions?id=eq.{question_id}
Body: { question, options, ... }

// Delete question
DELETE /rest/v1/exam_questions?id=eq.{question_id}
```

### Exam Attempts
```typescript
// Create exam attempt
POST /rest/v1/exam_attempts
Body: { exam_id, user_id, student_name, start_time, start_snapshot_url, ... }

// Submit answers
POST /rest/v1/exam_answers
Body: [{ attempt_id, question_id, selected_option, is_correct, ... }]

// Get student results
GET /rest/v1/exam_attempts?user_id=eq.{user_id}&order=start_time.desc

// Get all results for exam (Admin only)
GET /rest/v1/exam_attempts?exam_id=eq.{exam_id}&select=*,exams(title,subject)
```

### Analytics
```typescript
// Get exam statistics
GET /rest/v1/exam_attempts?exam_id=eq.{exam_id}&select=score,total_questions

// Get leaderboard
GET /rest/v1/exam_attempts?score=not.is.null&order=score.desc&limit=10
```

---

## 📱 PWA Features

### Offline Capabilities
- Exam rules cached for offline viewing
- Service worker for better performance
- Install as mobile app
- Push notifications for exam reminders

### Notifications
- 1 day before exam starts
- 1 hour before exam starts
- Instant result notifications
- Admin announcements

---

## 🎨 UI Screens

### Student Dashboard (`/exam`)
- List of active and upcoming exams
- Past exam history with scores
- Top 10 leaderboard
- Quick access to exam rules

### Exam Taking Interface (`/exam/:examId/take`)
- Question with 4 options
- Timer countdown
- Question navigator (grid view)
- Previous/Next navigation
- Submit button

### Results Page (`/exam/:examId/results/:attemptId`)
- Overall score and percentage
- Correct/Wrong/Unanswered breakdown
- Question-wise review with explanations
- Pass/Fail status
- Time taken

### Admin Dashboard (`/admin/exam-management`)
- Total exams count
- Active exams count
- Scheduled exams count
- Quick actions (Create, Edit, Delete)

### Question Management (`/admin/exam/:examId/questions`)
- List all questions for exam
- Add/Edit/Delete questions
- Bulk import with preview
- Filter by topic, difficulty

### Analytics Dashboard (`/exam/analytics`)
- Participation rate charts
- Average scores by subject
- Performance trends
- Difficulty analysis

---

## 🚀 Deployment

### Requirements
- Node.js 18+
- Supabase account (or Lovable Cloud)
- Modern browser with camera support

### Environment Variables
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

### Build & Deploy
```bash
npm install
npm run build
npm run preview  # Test production build
```

---

## 📞 Support

For technical issues or questions:
- Email: support@shivankhed.com
- Phone: +91 8390521263
- Website: www.shivankhedkhurd.com

---

## 📄 License

© 2025 Shivankhed Khurd Gram Panchayat. All rights reserved.

---

**Last Updated:** January 2025
**Version:** 1.0.0