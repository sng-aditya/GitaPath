import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header({ user, onLogout, darkMode, onToggleDarkMode, onShowLogin, onShowSignup }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isLandingPage = location.pathname === '/'

  const handleLogoClick = () => {
    if (user) {
      navigate('/reader')
    } else {
      navigate('/')
    }
  }

  const handleLoginClick = () => {
    if (onShowLogin) {
      onShowLogin()
    } else {
      navigate('/')
    }
  }

  const handleSignupClick = () => {
    if (onShowSignup) {
      onShowSignup()
    } else {
      navigate('/')
    }
  }

  return (
    <header className={`global-header ${isLandingPage ? 'landing-header' : ''}`}>
      <nav className="header-nav">
        <div className="logo" onClick={handleLogoClick}>
          🕉️ GitaPath
        </div>
        
        <div className="nav-menu">
          {user && (
            <>
              <button className="nav-button" onClick={() => navigate('/chapters')}>
                Chapters
              </button>
              <button className="nav-button" onClick={() => navigate('/verse-of-day')}>
                Daily Verse
              </button>
              {location.pathname === '/reader' && (
                <div className="verse-search">
                  <input 
                    type="text" 
                    placeholder="Ch.Verse (e.g., 2.47)"
                    className="search-input"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const [chapter, verse] = e.target.value.split('.')
                        if (chapter && verse && parseInt(chapter) >= 1 && parseInt(chapter) <= 18 && parseInt(verse) >= 1) {
                          // Trigger a custom event that Reader can listen to
                          window.dispatchEvent(new CustomEvent('navigateToVerse', {
                            detail: { chapter: parseInt(chapter), verse: parseInt(verse) }
                          }))
                          e.target.value = ''
                        }
                      }
                    }}
                  />
                </div>
              )}
            </>
          )}
          {user && !isLandingPage && (
            <button className="nav-button" onClick={() => navigate('/about')}>
              About
            </button>
          )}
          {user && !isLandingPage && (
            <button className="nav-button" onClick={() => navigate('/donate')}>
              Support Us
            </button>
          )}
        </div>

        <div className="user-section">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.name}</span>
              <button className="nav-button" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="nav-button" onClick={handleLoginClick}>
                Login
              </button>
              <button className="nav-button signup-button" onClick={handleSignupClick}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}