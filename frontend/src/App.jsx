import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Reader from './pages/Reader'
import About from './pages/About'
import VerseOfTheDay from './pages/VerseOfTheDay'
import Chapters from './pages/Chapters'
import Donate from './pages/Donate'
import Feedback from './pages/Feedback'
import Header from './components/Header'
import Footer from './components/Footer'
import SimpleBookmarksModal from './components/SimpleBookmarksModal'
import { useSnackbarContext } from './components/SnackbarProvider'
import config from './config'
import axios from 'axios'

export default function App() {
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
  const [bookmarks, setBookmarks] = useState([])
  const [showBookmarksModal, setShowBookmarksModal] = useState(false)
  const { showSuccess, showError, showInfo } = useSnackbarContext()


  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      loadBookmarks()
    }
  }, [user])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
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
      const res = await axios.get(`${config.API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data.user)
    } catch (err) {
      localStorage.removeItem('token')
    }
    setLoading(false)
  }

  async function loadBookmarks() {
    if (!user) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${config.API_BASE_URL}/api/user/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const bookmarksWithSlokas = await Promise.all(
        (res.data.bookmarks || []).map(async (bookmark) => {
          try {
            const verseRes = await axios.get(`${config.API_BASE_URL}/api/gita/slok/${bookmark.chapter}/${bookmark.verse}`)
            return {
              ...bookmark,
              slok: verseRes.data.slok
            }
          } catch (err) {
            return {
              ...bookmark,
              slok: 'Unable to load verse text'
            }
          }
        })
      )

      setBookmarks(bookmarksWithSlokas)
    } catch (err) {
      console.error('Failed to load bookmarks:', err)
    }
  }

  async function handleBookmarkVerse(verse) {
    if (!user || !verse) return

    try {
      const token = localStorage.getItem('token')
      const isCurrentlyBookmarked = isBookmarked(verse.chapter, verse.verse)

      if (isCurrentlyBookmarked) {
        // Remove bookmark
        await axios.delete(`${config.API_BASE_URL}/api/user/bookmark/${verse.chapter}/${verse.verse}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setBookmarks(prev => prev.filter(b => !(b.chapter === verse.chapter && b.verse === verse.verse)))
      } else {
        // Add bookmark with proper translation priority
        const translation = verse.rams?.ht || verse.prabhu?.ec || verse.siva?.et || verse.chinmay?.ht || 'No translation available'

        await axios.post(`${config.API_BASE_URL}/api/user/bookmark/${verse.chapter}/${verse.verse}`, {
          slok: verse.slok,
          translation: translation
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const newBookmark = {
          chapter: verse.chapter,
          verse: verse.verse,
          slok: verse.slok,
          translation: translation,
          createdAt: new Date().toISOString()
        }
        setBookmarks(prev => [newBookmark, ...prev])
      }
    } catch (err) {
      console.error('Failed to bookmark verse:', err)
      throw err // Re-throw to let the calling component handle the error
    }
  }

  function isBookmarked(chapter, verse) {
    return bookmarks.some(b => b.chapter === chapter && b.verse === verse)
  }

  async function handleDeleteBookmark(chapter, verse) {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${config.API_BASE_URL}/api/user/bookmark/${chapter}/${verse}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBookmarks(prev => prev.filter(b => !(b.chapter === chapter && b.verse === verse)))
      showSuccess('Bookmark deleted')
    } catch (err) {
      console.error('Failed to delete bookmark:', err)
      showError('Failed to delete bookmark. Please try again.')
    }
  }

  function handleNavigateToVerse(chapter, verse) {
    setShowBookmarksModal(false)
    navigate(`/reader?chapter=${chapter}&verse=${verse}`)
  }

  async function handleClearBookmarks() {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${config.API_BASE_URL}/api/user/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBookmarks([])
      showSuccess('All bookmarks cleared')
    } catch (err) {
      console.error('Failed to clear bookmarks:', err)
      showError('Failed to clear bookmarks. Please try again.')
    }
  }

  async function handleLogin(userData) {
    setUser(userData)
    setShowLoginModal(false)
    setShowSignupModal(false)

    // Check if user has progress and redirect to last read position
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${config.API_BASE_URL}/api/user/progress`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const progress = res.data.progress
      if (progress) {
        // Prioritize last_chapter/last_verse, fallback to current_chapter/current_verse
        const chapter = progress.last_chapter || progress.current_chapter || 1
        const verse = progress.last_verse || progress.current_verse || 1
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
    setBookmarks([])
    navigate('/')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-medium text-charcoal-600 dark:text-charcoal-300 bg-sand-50 dark:bg-charcoal-950">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="text-4xl">ॐ</div>
          <div>Loading GitaPath...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-sand-50 dark:bg-charcoal-950 transition-colors duration-300">
      <Header
        user={user}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onShowLogin={() => setShowLoginModal(true)}
        onShowSignup={() => setShowSignupModal(true)}
        bookmarks={bookmarks}
        onShowBookmarks={() => setShowBookmarksModal(true)}
      />

      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={
            <LandingPage
              onLogin={handleLogin}
              user={user}
              showLoginModal={showLoginModal}
              setShowLoginModal={setShowLoginModal}
              showSignupModal={showSignupModal}
              setShowSignupModal={setShowSignupModal}
              onBookmarkVerse={handleBookmarkVerse}
              isBookmarked={isBookmarked}
            />
          } />
          <Route path="/reader" element={<Reader user={user} darkMode={darkMode} bookmarks={bookmarks} onBookmarkVerse={handleBookmarkVerse} isBookmarked={isBookmarked} />} />
          <Route path="/about" element={<About />} />
          <Route path="/verse-of-day" element={<VerseOfTheDay user={user} />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/feedback" element={<Feedback user={user} />} />
        </Routes>
      </main>

      <Footer />

      {/* Login Modal */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${showLoginModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
        <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={() => setShowLoginModal(false)}></div>
        <div className={`relative w-full max-w-md bg-white dark:bg-charcoal-900 rounded-2xl shadow-2xl border border-charcoal-100 dark:border-charcoal-800 transform transition-all duration-300 ${showLoginModal ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'}`}>
          <div className="flex items-center justify-between p-6 border-b border-charcoal-100 dark:border-charcoal-800">
            <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white">Welcome Back</h2>
            <button onClick={() => setShowLoginModal(false)} className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-charcoal-200 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              try {
                const res = await axios.post(`${config.API_BASE_URL}/api/auth/login`, {
                  email: formData.get('email'),
                  password: formData.get('password')
                })
                localStorage.setItem('token', res.data.token)
                const userRes = await axios.get(`${config.API_BASE_URL}/api/auth/me`, {
                  headers: { Authorization: `Bearer ${res.data.token}` }
                })
                handleLogin(userRes.data.user)
                showSuccess('Welcome back!')
              } catch (err) {
                showError(err.response?.data?.error || 'Login failed')
              }
            }} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-medium rounded-lg shadow-lg shadow-saffron-500/30 transition-all transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
              <div className="text-center text-sm text-charcoal-600 dark:text-charcoal-400">
                Don't have an account? <a onClick={() => { setShowLoginModal(false); setShowSignupModal(true) }} className="text-saffron-600 hover:text-saffron-700 font-medium cursor-pointer">Sign up</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${showSignupModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}>
        <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" onClick={() => setShowSignupModal(false)}></div>
        <div className={`relative w-full max-w-md bg-white dark:bg-charcoal-900 rounded-2xl shadow-2xl border border-charcoal-100 dark:border-charcoal-800 transform transition-all duration-300 ${showSignupModal ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'}`}>
          <div className="flex items-center justify-between p-6 border-b border-charcoal-100 dark:border-charcoal-800">
            <h2 className="text-2xl font-bold text-charcoal-900 dark:text-white">Join the Journey</h2>
            <button onClick={() => setShowSignupModal(false)} className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-charcoal-200 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <form onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              const email = formData.get('email')
              const password = formData.get('password')

              // Email validation
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              if (!emailRegex.test(email)) {
                showError('Please provide a valid email address')
                return
              }

              // Password validation
              const passwordRegex = /^[a-zA-Z](?=.*[a-zA-Z])(?=.*[0-9]).{7,}$/
              if (!passwordRegex.test(password)) {
                showError('Password must be at least 8 characters, start with a letter, and contain both letters and numbers')
                return
              }

              try {
                const res = await axios.post(`${config.API_BASE_URL}/api/auth/signup`, {
                  name: formData.get('name'),
                  email,
                  password
                })
                localStorage.setItem('token', res.data.token)
                const userRes = await axios.get(`${config.API_BASE_URL}/api/auth/me`, {
                  headers: { Authorization: `Bearer ${res.data.token}` }
                })
                handleLogin(userRes.data.user)
                showSuccess('Account created successfully!')
              } catch (err) {
                showError(err.response?.data?.error || 'Signup failed')
              }
            }} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-charcoal-200 dark:border-charcoal-700 bg-white dark:bg-charcoal-800 text-charcoal-900 dark:text-white focus:ring-2 focus:ring-saffron-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-medium rounded-lg shadow-lg shadow-saffron-500/30 transition-all transform hover:-translate-y-0.5"
              >
                Create Account
              </button>
              <div className="text-center text-sm text-charcoal-600 dark:text-charcoal-400">
                Already have an account? <a onClick={() => { setShowSignupModal(false); setShowLoginModal(true) }} className="text-saffron-600 hover:text-saffron-700 font-medium cursor-pointer">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bookmarks Modal */}
      <SimpleBookmarksModal
        isOpen={showBookmarksModal}
        onClose={() => setShowBookmarksModal(false)}
        bookmarks={bookmarks}
        onDeleteBookmark={handleDeleteBookmark}
      />

      {/* Floating Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white dark:bg-charcoal-800 text-2xl shadow-lg shadow-charcoal-900/10 hover:scale-110 transition-transform duration-200 border border-charcoal-200 dark:border-charcoal-700"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  )
}
