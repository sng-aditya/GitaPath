import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Button from './ui/Button'

export default function Header({ user, onLogout, darkMode, onToggleDarkMode, onShowLogin, onShowSignup, bookmarks, onShowBookmarks }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const mobileMenuRef = useRef(null)

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
    setIsDesktopDropdownOpen(false)
    setIsMobileMenuOpen(false)
    onLogout()
  }

  const toggleDesktopDropdown = () => {
    setIsDesktopDropdownOpen(!isDesktopDropdownOpen)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = (e) => {
    e.stopPropagation()
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsDesktopDropdownOpen(false)
  }

  useEffect(() => {
    setIsDesktopDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }, [user, location.pathname])

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close desktop dropdown if clicked outside
      if (isDesktopDropdownOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDesktopDropdownOpen(false)
      }

      // Close mobile menu if clicked outside
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDesktopDropdownOpen, isMobileMenuOpen])

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isLandingPage
      ? 'bg-white/90 dark:bg-charcoal-950/90 backdrop-blur-md border-b border-transparent'
      : 'bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md border-b border-charcoal-200 dark:border-charcoal-800'
      }`}>
      <nav className="container-custom h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold bg-gradient-to-r from-saffron-500 to-saffron-600 bg-clip-text text-transparent cursor-pointer flex items-center gap-2"
          onClick={handleLogoClick}
        >
          <span>ॐ</span>
          <span>GitaPath</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <>
              <button onClick={() => navigate('/chapters')} className="text-charcoal-600 dark:text-charcoal-300 hover:text-saffron-600 dark:hover:text-saffron-400 font-medium transition-colors">
                Chapters
              </button>
              <button onClick={() => navigate('/verse-of-day')} className="text-charcoal-600 dark:text-charcoal-300 hover:text-saffron-600 dark:hover:text-saffron-400 font-medium transition-colors">
                Daily Verse
              </button>
              <button onClick={() => navigate('/about')} className="text-charcoal-600 dark:text-charcoal-300 hover:text-saffron-600 dark:hover:text-saffron-400 font-medium transition-colors">
                About
              </button>
              <button onClick={() => navigate('/donate')} className="text-charcoal-600 dark:text-charcoal-300 hover:text-saffron-600 dark:hover:text-saffron-400 font-medium transition-colors">
                Support
              </button>
              <button onClick={handleBookmarksClick} className="text-charcoal-600 dark:text-charcoal-300 hover:text-saffron-600 dark:hover:text-saffron-400 font-medium transition-colors flex items-center gap-1">
                <span>📖</span>
                <span>Bookmarks ({bookmarks?.length || 0})</span>
              </button>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4" ref={menuRef}>
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDesktopDropdown}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-saffron-50 dark:bg-charcoal-800 text-saffron-700 dark:text-saffron-400 font-medium border border-saffron-200 dark:border-charcoal-700 hover:bg-saffron-100 dark:hover:bg-charcoal-700 transition-colors"
              >
                <span>👤 {user.name}</span>
                <span className="text-xs">{isDesktopDropdownOpen ? '▲' : '▼'}</span>
              </button>

              {isDesktopDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-charcoal-900 rounded-xl shadow-xl border border-charcoal-100 dark:border-charcoal-800 py-1 animate-fade-in">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={handleLoginClick}>
                Login
              </Button>
              <Button variant="primary" onClick={handleSignupClick}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Container */}
        <div className="md:hidden" ref={mobileMenuRef}>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 rounded-lg transition-colors"
            >
              <span className="text-2xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="absolute top-20 left-0 w-full bg-white dark:bg-charcoal-900 border-b border-charcoal-200 dark:border-charcoal-800 shadow-xl animate-slide-up">
              <div className="container-custom py-4 flex flex-col gap-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 text-sm text-charcoal-500 dark:text-charcoal-400 font-medium border-b border-charcoal-100 dark:border-charcoal-800 mb-2">
                      Signed in as {user.name}
                    </div>
                    <button onClick={() => handleNavClick('/chapters')} className="w-full text-left px-4 py-3 rounded-lg hover:bg-charcoal-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-200 font-medium transition-colors">
                      Chapters
                    </button>
                    <button onClick={() => handleNavClick('/verse-of-day')} className="w-full text-left px-4 py-3 rounded-lg hover:bg-charcoal-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-200 font-medium transition-colors">
                      Daily Verse
                    </button>
                    <button onClick={() => handleNavClick('/about')} className="w-full text-left px-4 py-3 rounded-lg hover:bg-charcoal-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-200 font-medium transition-colors">
                      About
                    </button>
                    <button onClick={() => handleNavClick('/donate')} className="w-full text-left px-4 py-3 rounded-lg hover:bg-charcoal-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-200 font-medium transition-colors">
                      Support Us
                    </button>
                    <button onClick={handleBookmarksClick} className="w-full text-left px-4 py-3 rounded-lg hover:bg-charcoal-50 dark:hover:bg-charcoal-800 text-charcoal-700 dark:text-charcoal-200 font-medium transition-colors">
                      Bookmarks ({bookmarks?.length || 0})
                    </button>
                    <div className="border-t border-charcoal-100 dark:border-charcoal-800 my-2"></div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-medium transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3 p-4">
                    <Button variant="secondary" onClick={handleLoginClick} className="w-full justify-center">
                      Login
                    </Button>
                    <Button variant="primary" onClick={handleSignupClick} className="w-full justify-center">
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}