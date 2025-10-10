import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TestLanding from './pages/TestLanding'
import Reader from './pages/Reader'
import About from './pages/About'
import VerseOfTheDay from './pages/VerseOfTheDay'
import Chapters from './pages/Chapters'
import Donate from './pages/Donate'
import Header from './components/Header'
import Footer from './components/Footer'
import { SnackbarProvider } from './components/SnackbarProvider'
import axios from 'axios'

export default function App(){
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)


  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  async function checkAuth() {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const res = await axios.get('http://10.30.161.230:4000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data.user)
    } catch (err) {
      localStorage.removeItem('token')
    }
    setLoading(false)
  }

  async function handleLogin(userData) {
    setUser(userData)
    setShowLoginModal(false)
    setShowSignupModal(false)
    
    // Check if user has progress
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://10.30.161.230:4000/api/user/progress', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (res.data.progress && (res.data.progress.last_chapter || res.data.progress.current_chapter)) {
        // User has progress, redirect to their last position
        const chapter = res.data.progress.last_chapter || res.data.progress.current_chapter
        const verse = res.data.progress.last_verse || res.data.progress.current_verse || 1
        navigate(`/reader?chapter=${chapter}&verse=${verse}`)
      } else {
        // New user, start from beginning
        navigate('/reader?chapter=1&verse=1')
      }
    } catch (err) {
      console.log('Could not load progress, starting from beginning')
      navigate('/reader?chapter=1&verse=1')
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem' 
      }}>
        Loading...
      </div>
    )
  }

  return (
    <SnackbarProvider>
      <div className="app">
        <Header 
          user={user} 
          onLogout={handleLogout} 
          darkMode={darkMode} 
          onToggleDarkMode={toggleDarkMode}
          onShowLogin={() => setShowLoginModal(true)}
          onShowSignup={() => setShowSignupModal(true)}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <LandingPage 
                onLogin={handleLogin} 
                user={user}
                onShowLogin={() => setShowLoginModal(true)}
                onShowSignup={() => setShowSignupModal(true)}
              />
            } />
            <Route path="/reader" element={<Reader user={user} darkMode={darkMode} />} />
            <Route path="/about" element={<About />} />
            <Route path="/verse-of-day" element={<VerseOfTheDay user={user} />} />
            <Route path="/chapters" element={<Chapters />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
        </main>
        
        <Footer />

        {/* Login Modal */}
        <div className={`modal ${showLoginModal ? 'show' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Welcome Back</h2>
              <span className="close" onClick={() => setShowLoginModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <form onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                try {
                  const res = await axios.post('http://10.30.161.230:4000/api/auth/login', {
                    email: formData.get('email'),
                    password: formData.get('password')
                  })
                  localStorage.setItem('token', res.data.token)
                  const userRes = await axios.get('http://10.30.161.230:4000/api/auth/me', {
                    headers: { Authorization: `Bearer ${res.data.token}` }
                  })
                  handleLogin(userRes.data.user)
                } catch (err) {
                  alert(err.response?.data?.error || 'Login failed')
                }
              }}>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" required />
                </div>
                <button type="submit" className="form-submit">Sign In</button>
                <div className="form-switch">
                  Don't have an account? <a onClick={() => {setShowLoginModal(false); setShowSignupModal(true)}}>Sign up</a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Signup Modal */}
        <div className={`modal ${showSignupModal ? 'show' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Join the Journey</h2>
              <span className="close" onClick={() => setShowSignupModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <form onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                try {
                  const res = await axios.post('http://10.30.161.230:4000/api/auth/signup', {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password')
                  })
                  localStorage.setItem('token', res.data.token)
                  const userRes = await axios.get('http://10.30.161.230:4000/api/auth/me', {
                    headers: { Authorization: `Bearer ${res.data.token}` }
                  })
                  handleLogin(userRes.data.user)
                } catch (err) {
                  alert(err.response?.data?.error || 'Signup failed')
                }
              }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" required />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" required />
                </div>
                <button type="submit" className="form-submit">Create Account</button>
                <div className="form-switch">
                  Already have an account? <a onClick={() => {setShowSignupModal(false); setShowLoginModal(true)}}>Sign in</a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Floating Theme Toggle */}
        <div className="floating-theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </div>
      </div>
    </SnackbarProvider>
  )
}
