import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header({ user, onLogout, darkMode, onToggleDarkMode, onShowLogin, onShowSignup, bookmarks, onShowBookmarks }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)

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
    setIsDesktopDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const handleSignupClick = () => {
    if (onShowSignup) {
      onShowSignup()
    } else {
      navigate('/')
    }
    setIsDesktopDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (path) => {
    navigate(path)
    setIsDesktopDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const handleBookmarksClick = () => {
    if (onShowBookmarks) {
      onShowBookmarks()
    }
    setIsDesktopDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = () => {
    // Close all menus before logging out
    setIsDesktopDropdownOpen(false)
    setIsMobileMenuOpen(false)
    // Call the logout function
    onLogout()
  }

  const toggleDesktopDropdown = () => {
    setIsDesktopDropdownOpen(!isDesktopDropdownOpen)
    setIsMobileMenuOpen(false) // Close mobile menu if open
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsDesktopDropdownOpen(false) // Close desktop dropdown if open
  }

  // Reset menu states when user changes (login/logout)
  useEffect(() => {
    setIsDesktopDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }, [user])

  // Reset menu states when route changes
  useEffect(() => {
    setIsDesktopDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the nav-right container (which contains both button and menu)
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        console.log('Click outside detected, closing menus')
        setIsDesktopDropdownOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    if (isDesktopDropdownOpen || isMobileMenuOpen) {
      // Use a timeout to ensure button clicks are processed first
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside)
      }, 100)
      
      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('click', handleClickOutside)
      }
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isDesktopDropdownOpen, isMobileMenuOpen])

  return (
    <header className={`global-header ${isLandingPage ? 'landing-header' : ''}`}>
      <nav className="header-nav">
        <div className="nav-left">
          <div className="logo" onClick={handleLogoClick}>
            ॐ GitaPath
          </div>
        </div>
        
        <div className="nav-center">
          {user && (
            <>
              <button className="nav-button" onClick={() => navigate('/chapters')}>
                Chapters
              </button>
              <button className="nav-button" onClick={() => navigate('/verse-of-day')}>
                Daily Verse
              </button>
              <button className="nav-button" onClick={() => navigate('/about')}>
                About
              </button>
              <button className="nav-button" onClick={() => navigate('/donate')}>
                Support Us
              </button>
              <button className="nav-button" onClick={handleBookmarksClick}>
                📖 Bookmarks ({bookmarks?.length || 0})
              </button>
            </>
          )}
        </div>
        
        <div className="nav-right" ref={menuRef}>
          <div className="desktop-nav">
            {user ? (
              <div className="user-dropdown">
                <button className="user-button" onClick={toggleDesktopDropdown}>
                  👤 {user.name} {isDesktopDropdownOpen ? '▲' : '▼'}
                </button>
                {isDesktopDropdownOpen && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
          
          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            Menu {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay">
            <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          {user ? (
            <>
              <div className="mobile-user-info">
                <span className="welcome-text">Welcome, {user.name}</span>
              </div>
              <button className="nav-button" onClick={() => handleNavClick('/chapters')}>
                Chapters
              </button>
              <button className="nav-button" onClick={() => handleNavClick('/verse-of-day')}>
                Daily Verse
              </button>
              <button className="nav-button" onClick={() => handleNavClick('/about')}>
                About
              </button>
              <button className="nav-button" onClick={() => handleNavClick('/donate')}>
                Support Us
              </button>
              <button className="nav-button" onClick={handleBookmarksClick}>
                📖 Bookmarks ({bookmarks?.length || 0})
              </button>
              <button className="nav-button logout-button" onClick={handleLogout}>
                Logout
              </button>
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
          </div>
        )}
      </nav>
    </header>
  )
}