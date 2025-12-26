# 🕉️ GitaPath - Your Digital Companion to the Bhagavad Gita

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://vedicgitapath.netlify.app)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)

> A modern, beautiful web application to read, understand, and explore the timeless wisdom of the Bhagavad Gita.

## ✨ Features

### 📖 Reading Experience
- **18 Chapters, 700+ Verses** - Complete Bhagavad Gita in Sanskrit with translations
- **Multiple Translations** - Hindi and English translations from renowned scholars
- **Word-by-Word Meaning** - Understand each Sanskrit word
- **Beautiful Typography** - Devanagari script with transliteration
- **Dark Mode** - Easy on the eyes for extended reading sessions

### 🎯 Smart Features
- **Daily Verse** - Get a personalized verse every day
- **Bookmarks** - Save your favorite verses
- **Reading Progress** - Track your journey through the Gita
- **Chapter Navigation** - Quick access to all 18 chapters
- **Responsive Design** - Perfect on mobile, tablet, and desktop

### 👤 User Features
- **User Authentication** - Secure login/signup
- **Personal Dashboard** - Track your reading streak
- **Feedback System** - Share your thoughts and suggestions

## 🚀 Live Demo

**Visit:** [https://vedicgitapath.netlify.app](https://vedicgitapath.netlify.app)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js & Express** - RESTful API
- **MongoDB** - Database for user data
- **JWT** - Secure authentication
- **Winston** - Logging

### Deployment
- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

## 📸 Screenshots

### Home Page
Beautiful landing page with quick access to start reading

### Reader View
Immersive reading experience with Sanskrit text and translations

### Daily Verse
Get inspired with a new verse every day

## 🏗️ Project Structure

```
GitaPath/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── config/     # API configuration
│   │   └── hooks/      # Custom React hooks
│   └── public/
├── backend/            # Express backend
│   ├── routes/         # API routes
│   ├── models/         # MongoDB models
│   ├── utils/          # Utility functions
│   └── db/             # Database connection
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account (free tier works)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sng-aditya/GitaPath.git
cd GitaPath
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URL and JWT secret
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend URL
npm run dev
```

4. **Open your browser**
```
Frontend: http://localhost:5173
Backend: http://localhost:4000
```

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:4000
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Gita Content
- `GET /api/gita/chapters` - Get all chapters
- `GET /api/gita/:chapter/:verse` - Get specific verse
- `GET /api/gita/verse-of-day` - Get daily verse
- `GET /api/gita/random` - Get random verse

### User Features
- `GET /api/user/bookmarks` - Get user bookmarks
- `POST /api/user/bookmark/:chapter/:verse` - Add bookmark
- `DELETE /api/user/bookmark/:chapter/:verse` - Remove bookmark
- `POST /api/user/progress` - Update reading progress

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Verse content from [Vedic Scriptures](https://vedicscriptures.github.io/)
- Translations by Swami Chinmayananda, Swami Sivananda, and other renowned scholars
- Inspired by the timeless wisdom of the Bhagavad Gita

## 📧 Contact

**Aditya Singh** - [GitHub](https://github.com/sng-aditya)

**Project Link:** [https://github.com/sng-aditya/GitaPath](https://github.com/sng-aditya/GitaPath)

---

<div align="center">

### 🕉️ May the wisdom of the Gita guide your path 🕉️

**[Visit GitaPath](https://vedicgitapath.netlify.app)** | **[Report Bug](https://github.com/sng-aditya/GitaPath/issues)** | **[Request Feature](https://github.com/sng-aditya/GitaPath/issues)**

Made with ❤️ for seekers of wisdom

</div>
