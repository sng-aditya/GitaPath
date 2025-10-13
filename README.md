# 🕉️ GitaPath - Daily Wisdom from Bhagavad Gita

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)](https://mongodb.com/)
[![Vite](https://img.shields.io/badge/Build-Vite-purple)](https://vitejs.dev/)

A modern, responsive web application for reading and tracking your progress through the Bhagavad Gita. GitaPath provides daily verses, bookmark functionality, reading progress tracking, and a beautiful user interface with dark mode support.

## ✨ Features

### 📖 Reading Experience
- **Verse-by-verse reading** with Sanskrit text, transliteration, and multiple translations
- **Daily verse** feature with personalized verse selection
- **Multiple author translations** (Swami Prabhupada, Paramahansa Yogananda, and more)
- **Chapter navigation** with verse grid for easy browsing
- **Responsive design** optimized for desktop and mobile devices

### 👤 User Features
- **User authentication** with secure JWT-based login/signup
- **Reading progress tracking** with chapter and verse position
- **Bookmark system** to save favorite verses
- **Streak tracking** to maintain daily reading habits
- **Personal dashboard** with reading statistics

### 🎨 User Interface
- **Modern, clean design** with saffron color scheme inspired by spiritual aesthetics
- **Dark mode support** with AMOLED-optimized true black theme
- **Smooth animations** and transitions
- **Mobile-responsive** layout that works on all devices
- **Accessibility features** with proper contrast ratios and readable fonts

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/GitaPath.git
   cd GitaPath
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URL and JWT secret
   npm run dev
   ```

3. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your backend URL
   npm run dev
   ```

## 🌐 Deployment

### Backend (Railway)
- Automatically deploys from `backend/` directory
- Set environment variables in Railway dashboard
- MongoDB Atlas connection required

### Frontend (Netlify)
- Build: `npm run build` in `frontend/` directory
- Deploy `dist/` folder to Netlify
- Set `VITE_API_BASE_URL` environment variable

## 🏗️ Project Structure

```
GitaPath/
├── backend/                 # Node.js + Express API
│   ├── routes/             # API route handlers
│   ├── models/             # MongoDB models
│   ├── db/                 # Database configuration
│   └── utils/              # Utilities and logging
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── hooks/          # Custom React hooks
│   └── dist/               # Build output
└── docs/                   # Documentation
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vedic Scriptures API** for providing the Bhagavad Gita content
- **React and Vite communities** for excellent development tools

---

*"योगस्थः कुरु कर्माणि" - Established in yoga, perform action.*

**GitaPath** - Your companion in the journey of spiritual wisdom through the timeless teachings of the Bhagavad Gita.