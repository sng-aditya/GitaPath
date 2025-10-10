# 🕉️ GitaPath — The Bhagavad Gita Reading Tracker Web App

### **Goal**
Create a **web-first spiritual reading and reflection platform** that allows users to read the Bhagavad Gita *chapter by chapter, verse by verse*, while tracking their progress, streaks, and reflections.

---

## 🧱 Tech Stack

**Frontend:** React (Vite or CRA), Tailwind CSS (or styled-components for global theme)  
**Backend:** Node.js + Express  
**Database:** SQLite (for MVP; migratable to MongoDB)  
**Auth:** JWT-based session management  
**API Source:** [Bhagavad Gita API — vedicscriptures/bhagavad-gita-api](https://github.com/vedicscriptures/bhagavad-gita-api)  
**Deployment:**  
- Frontend → Vercel/Netlify  
- Backend → Render/Railway  
- SQLite local file (for MVP), later switch to external DB

---

## 🎯 Primary Objective

A **linear, book-like reading web app** for the Bhagavad Gita with progress tracking.

Users can:
- Read Gita chapter by chapter and verse by verse  
- Track progress and daily streaks  
- Bookmark favorite verses  
- View completion stats (total verses, chapters completed)  
- Resume where they left off

---

## 🧩 Core Features

### **1. Authentication**
- JWT-based Signup/Login (no social logins needed)
- Store user info in SQLite:
  - `id`, `name`, `email`, `password_hash`
  - `current_chapter`, `current_verse`
  - `streak_count`, `last_read_date`
  - `bookmarks` (relation table)

---

### **2. Chapter & Verse Reading**
- Use Bhagavad Gita API endpoints:
  - `/chapters` — list all 18 chapters  
  - `/chapter/:ch` — single chapter info  
  - `/slok/:ch/:sl` — verse-level data
- Book-like interface:
  - Sidebar: chapter selection
  - Main panel: verse + translations
  - Navigation: Next / Previous
- Save progress in DB after each verse
- Show % completed (out of 700 total verses)

---

### **3. Reading Progress & Streak**
- Increment streak when user reads daily
- Reset streak if missed a day
- Dashboard shows:
  - Current streak
  - Total verses read
  - Chapters completed
  - Progress bar (0–100%)

---

### **4. Bookmark System**
- “⭐ Bookmark” button for any verse  
- Store bookmarks in DB linked to user  
- View all bookmarks on a dedicated page

---

### **5. Dashboard**
- Personalized reading summary:
  - Streak count  
  - Verses read  
  - Chapters completed  
  - Progress visualization  
- “Continue Reading” button loads the last verse position

---

### **6. Random Verse Feature (Optional)**
- “Inspire Me” button on homepage  
- Fetch a random sloka from API  
- Display it as a quote card with:
  - Sanskrit, transliteration, translation
  - Share button (copy/share link)

---

## 🎨 UI/UX
- Global styling with Tailwind CSS (dark mode preferred)
- Simple typography for Sanskrit + translation readability
- Navigation: sidebar or top nav
  - Home
  - Continue Reading
  - Bookmarks
  - Profile/Stats
- Smooth transitions using Framer Motion (optional)

---

## ⚙️ Backend Structure

### **Routes**

#### `/api/auth`
- `POST /signup`
- `POST /login`
- `GET /me` → verify JWT, return user data

#### `/api/user`
- `POST /progress` → update last read verse, streak  
- `GET /progress`  
- `POST /bookmark/:ch/:sl`  
- `GET /bookmarks`

#### `/api/gita`
- Proxy to Bhagavad Gita API:
  - `GET /chapters`
  - `GET /chapter/:ch`
  - `GET /slok/:ch/:sl`
- Cache responses for performance

---

### **Database Models**

#### Users
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | User name |
| email | TEXT | Unique email |
| password_hash | TEXT | Hashed password |
| current_chapter | INTEGER | Current reading chapter |
| current_verse | INTEGER | Current reading verse |
| streak_count | INTEGER | Active streak days |
| last_read_date | DATE | Last reading timestamp |

#### Bookmarks
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER | Primary key |
| user_id | INTEGER | Foreign key |
| chapter | INTEGER | Chapter number |
| verse | INTEGER | Verse number |
| created_at | DATE | Timestamp |

*(Optionally, a `Progress` table can be added for detailed verse-level history.)*

---

## 🚀 Implementation Roadmap

### **Phase 1 — Setup**
- Initialize React + Node projects  
- Configure SQLite with Prisma or Sequelize ORM  
- Setup JWT auth + protected routes

### **Phase 2 — Reading Flow**
- Implement API proxy  
- Build reading UI with navigation  
- Save reading position in DB

### **Phase 3 — Progress/Streak**
- Track verse reads per day  
- Add streak increment/reset logic

### **Phase 4 — Bookmarks & Dashboard**
- Bookmark CRUD endpoints  
- Build dashboard UI (streak, stats, progress)

### **Phase 5 — Random Verse Feature**
- Fetch random verse and display shareable card

### **Phase 6 — Styling**
- Add Tailwind global theme  
- Final responsive polish

---

## 💡 Optional Features (Future)
- Reflection journal per verse  
- Daily email reminder  
- Leaderboard (top readers)  
- Language toggle (EN/HI)  
- AI-generated chapter summaries  
- Export notes/bookmarks as PDF  
- PWA offline support  

---

## 🧠 Developer Notes
- Cache API responses locally (SQLite table or memory)
- Store timestamps in ISO format for streak logic  
- Keep JWT in localStorage  
- Manage reading and user states using React Context or Zustand

---

## 🎓 Deliverable
A **fully functional, responsive Bhagavad Gita reader web app** with:
- JWT-based user sessions  
- Progress and streak tracking  
- Chapter/verse navigation  
- Bookmarks and dashboard  
- SQLite backend (migratable to MongoDB)  
- Tailwind-styled, mobile-friendly UI  

---

## 📊 Stretch Goals
- Switch to MongoDB
- Add Gita quiz/gamification
- “Verse of the Day” API endpoint
- Social sharing for quote cards

---

## ✅ Validation
- Test with 10–20 users reading one chapter  
- Collect feedback on streak motivation and UX  
- Analyze time-on-site and repeat visits

---

### **Final Vision**
> “GitaPath” isn’t just another scripture reader — it’s a personal companion for young Indians to rediscover focus, discipline, and inner calm through the timeless verses of the Bhagavad Gita.

---
