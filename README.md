# 🕉️ GitaPath - Daily Wisdom from Bhagavad Gita

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/Database-SQLite-blue)](https://sqlite.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-purple)](https://vitejs.dev/)

A modern, responsive web application for reading and tracking your progress through the Bhagavad Gita. GitaPath provides daily verses, bookmark functionality, reading progress tracking, and a beautiful user interface with dark mode support.

## ✨ Features

### 📖 Reading Experience
- **Verse-by-verse reading** with Sanskrit text, transliteration, and multiple translations
- **Daily verse** feature with random verse selection
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

### 🔧 Technical Features
- **Fast performance** with optimized caching and lazy loading
- **Offline capabilities** with service worker support
- **Cross-platform compatibility** (Windows, macOS, Linux)
- **Network sharing** - access from multiple devices on the same network

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sng-aditya/GitaPath.git
   cd GitaPath
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   node db/init.js    # Initialize SQLite database
   npm run dev        # Start development server
   ```

3. **Set up the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev        # Start Vite development server
   ```

4. **Access the application**
   - Local: `http://localhost:5173`
   - Network: `http://[your-ip]:5173` (for mobile access)

### Network Access (Mobile Testing)

To access the app from your mobile device:

1. Ensure both frontend and backend are running
2. Find your computer's IP address:
   - Windows: `ipconfig`
   - macOS/Linux: `ifconfig` or `hostname -I`
3. Access from mobile: `http://[your-computer-ip]:5173`

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for mobile devices with:
- Touch-friendly navigation
- Optimized font sizes and spacing
- Collapsible menus and adaptive layouts
- Smooth scrolling and gesture support

## 🏗️ Project Structure

```
GitaPath/
├── backend/                 # Node.js + Express API
│   ├── routes/             # API route handlers
│   │   ├── auth.js        # Authentication routes
│   │   ├── gita.js        # Gita content API proxy
│   │   └── user.js        # User data management
│   ├── db/                # Database setup and utilities
│   ├── utils/             # Logging and utilities
│   └── index.js           # Main server file
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── styles.css     # Global styles
│   └── index.html         # Entry HTML file
└── docs/                  # Documentation files
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### User Management
- `GET /api/user/progress` - Get reading progress
- `POST /api/user/progress` - Update reading progress
- `GET /api/user/bookmarks` - Get user bookmarks
- `POST /api/user/bookmark/:ch/:sl` - Add bookmark
- `DELETE /api/user/bookmark/:ch/:sl` - Remove bookmark

### Gita Content
- `GET /api/gita/chapters` - Get all chapters
- `GET /api/gita/chapter/:ch` - Get specific chapter
- `GET /api/gita/slok/:ch/:sl` - Get specific verse
- `GET /api/gita/random` - Get random verse
- `GET /api/gita/next/:ch/:sl` - Get next verse
- `GET /api/gita/previous/:ch/:sl` - Get previous verse

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database for user data
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Winston** - Logging
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with custom properties and grid/flexbox

## 🎨 Design Philosophy

GitaPath follows a spiritual and minimalist design approach:
- **Saffron color palette** inspired by traditional spiritual aesthetics
- **Clean typography** with proper hierarchy and readability
- **Spacious layouts** to reduce cognitive load
- **Smooth animations** to create a peaceful user experience
- **Dark mode** for comfortable reading in low light

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests or open issues for:
- Bug fixes
- Feature enhancements
- UI/UX improvements
- Documentation improvements
- Translation support
- Accessibility improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vedic Scriptures API** for providing the Bhagavad Gita content
- **React and Vite communities** for excellent development tools
- **Contributors** who help improve this spiritual learning platform

## 📞 Support

If you encounter any issues or have questions:
1. Check the [documentation](docs/) folder
2. Open an issue on GitHub
3. Contact the maintainer: [sng-aditya](https://github.com/sng-aditya)

---

*"योगस्थः कुरु कर्माणि" - Established in yoga, perform action.*

**GitaPath** - Your companion in the journey of spiritual wisdom through the timeless teachings of the Bhagavad Gita.
