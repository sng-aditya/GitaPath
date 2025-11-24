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
  const mobileMenuBtnRef = useRef(null)

  const handleLogoClick = () => {
    navigate('/')
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

  const handleSavedClick = () => {
    if (user) {
      if (onShowBookmarks) {
        onShowBookmarks()
      }
    } else {
      if (onShowLogin) {
        onShowLogin()
      }
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
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && (!mobileMenuBtnRef.current || !mobileMenuBtnRef.current.contains(event.target))) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDesktopDropdownOpen, isMobileMenuOpen])

  return (
    <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isLandingPage
      ? 'bg-white/90 dark:bg-charcoal-950/90 backdrop-blur-md border-b border-transparent'
      : 'bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md border-b border-charcoal-200 dark:border-charcoal-800'
      }`}>
      <nav className="container-custom h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="text-2xl font-bold bg-gradient-to-r from-saffron-500 to-saffron-600 bg-clip-text text-transparent cursor-pointer flex items-center gap-2 shrink-0"
        >
          <span>ॐ</span>
          <span>GitaPath</span>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden md:flex items-center justify-center gap-6 flex-1 px-8">
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
          <button
            onClick={handleSavedClick}
            className="text-charcoal-600 dark:text-charcoal-300 hover:text-saffron-600 dark:hover:text-saffron-400 font-medium transition-colors"
          >
            Saved{user ? ` (${bookmarks?.length || 0})` : ''}
          </button>
          <button onClick={() => navigate('/feedback')} className="text-charcoal-600 dark:text-charcoal-300 hover:text-saffron-600 dark:hover:text-saffron-400 font-medium transition-colors">
            Feedback
          </button>
        </div>

        {/* Auth Buttons / User Menu - Right */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={toggleDesktopDropdown}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200 max-w-[100px] truncate">
                  {user.name}
                </span>
                <svg className={`w-4 h-4 text-charcoal-500 transition-transform duration-200 ${isDesktopDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDesktopDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-charcoal-900 rounded-xl shadow-xl border border-charcoal-100 dark:border-charcoal-800 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-3 border-b border-charcoal-100 dark:border-charcoal-800">
                    <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Signed in as</p>
                    <p className="text-sm font-medium text-charcoal-900 dark:text-white truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={handleLoginClick}>
                Sign In
              </Button>
              <Button variant="primary" onClick={handleSignupClick}>
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            ref={mobileMenuBtnRef}
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
  const location = useLocation()
            const isLandingPage = location.pathname === '/'
            const [isDesktopDropdownOpen, setIsDesktopDropdownOpen] = useState(false)
            const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
            const menuRef = useRef(null)
            const mobileMenuRef = useRef(null)
            const mobileMenuBtnRef = useRef(null)

  const handleLogoClick = () => {
              navigate('/')
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

  const handleSavedClick = () => {
    if (user) {
      if (onShowBookmarks) {
              onShowBookmarks()
            }
    } else {
      if (onShowLogin) {
              onShowLogin()
            }
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
            if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && (!mobileMenuBtnRef.current || !mobileMenuBtnRef.current.contains(event.target))) {
              setIsMobileMenuOpen(false)
            }
    }

            document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDesktopDropdownOpen, isMobileMenuOpen])

            return (
            <header className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isLandingPage
              ? 'bg-white/90 dark:bg-charcoal-950/90 backdrop-blur-md border-b border-transparent'
              : 'bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md border-b border-charcoal-200 dark:border-charcoal-800'
              }`}>
              <nav className="container-custom h-20 flex items-center justify-between">
                {/* Logo */}
                <div
                  onClick={handleLogoClick}
                  className="text-2xl font-bold bg-gradient-to-r from-saffron-500 to-saffron-600 bg-clip-text text-transparent cursor-pointer flex items-center gap-2 shrink-0"
                >
                  <span>ॐ</span>
                  <span>GitaPath</span>
                </div>

                {/* Desktop Navigation - Center */}
                <div className="hidden md:flex items-center justify-center gap-6 flex-1 px-8">
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
                  <button
                    onClick={handleSavedClick}
                    className="text-charcoal-600 dark:text-charcoal-300 hover:text-saffron-600 dark:hover:text-saffron-400 font-medium transition-colors"
                  >
                    Saved{user ? ` (${bookmarks?.length || 0})` : ''}
                  </button>
                  <button onClick={() => navigate('/feedback')} className="text-charcoal-600 dark:text-charcoal-300 hover:text-saffron-600 dark:hover:text-saffron-400 font-medium transition-colors">
                    Feedback
                  </button>
                </div>

                {/* Auth Buttons / User Menu - Right */}
                <div className="hidden md:flex items-center gap-4 shrink-0">
                  {user ? (
                    <div className="relative" ref={menuRef}>
                      <button
                        onClick={toggleDesktopDropdown}
                        className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center text-white font-bold text-sm">
                          {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <span className="text-sm font-medium text-charcoal-700 dark:text-charcoal-200 max-w-[100px] truncate">
                          {user.name}
                        </span>
                        <svg className={`w-4 h-4 text-charcoal-500 transition-transform duration-200 ${isDesktopDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isDesktopDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-charcoal-900 rounded-xl shadow-xl border border-charcoal-100 dark:border-charcoal-800 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
                          <div className="px-4 py-3 border-b border-charcoal-100 dark:border-charcoal-800">
                            <p className="text-sm text-charcoal-500 dark:text-charcoal-400">Signed in as</p>
                            <p className="text-sm font-medium text-charcoal-900 dark:text-white truncate">{user.email}</p>
                          </div>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" onClick={handleLoginClick}>
                        Sign In
                      </Button>
                      <Button variant="primary" onClick={handleSignupClick}>
                        Sign Up
                      </Button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-4">
                  <button
                    ref={mobileMenuBtnRef}
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 transition-colors"
                  >
                    {isMobileMenuOpen ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </nav>

              {/* Mobile Menu */}
              {isMobileMenuOpen && (
                <div ref={mobileMenuRef} className="md:hidden absolute top-full left-0 w-full max-h-[85vh] bg-white/95 dark:bg-charcoal-900/95 backdrop-blur-xl overflow-y-auto border-t border-charcoal-100 dark:border-charcoal-800 shadow-2xl rounded-b-2xl">
                  <div className="p-4 flex flex-col gap-2">
                    {user ? (
                      <div className="flex items-center gap-4 p-4 bg-charcoal-50/50 dark:bg-charcoal-800/50 rounded-xl mb-2 border border-charcoal-100 dark:border-charcoal-700">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {user.name ? user.name[0].toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-charcoal-900 dark:text-white truncate text-lg">{user.name}</p>
                          <p className="text-sm text-charcoal-500 dark:text-charcoal-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <Button variant="ghost" onClick={handleLoginClick} className="w-full justify-center py-3 text-base">
                          Sign In
                        </Button>
                        <Button variant="primary" onClick={handleSignupClick} className="w-full justify-center py-3 text-base shadow-lg shadow-saffron-500/20">
                          Sign Up
                        </Button>
                      </div>
                    )}

                    <div className="space-y-1">
                      <button onClick={() => handleNavClick('/chapters')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-charcoal-50 dark:hover:bg-charcoal-800/50 text-charcoal-700 dark:text-charcoal-200 font-medium transition-all active:scale-[0.98]">
                        <span className="p-2 rounded-lg bg-saffron-100/50 dark:bg-saffron-900/20 text-saffron-600 dark:text-saffron-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </span>
                        Chapters
                      </button>
                      <button onClick={() => handleNavClick('/verse-of-day')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-charcoal-50 dark:hover:bg-charcoal-800/50 text-charcoal-700 dark:text-charcoal-200 font-medium transition-all active:scale-[0.98]">
                        <span className="p-2 rounded-lg bg-saffron-100/50 dark:bg-saffron-900/20 text-saffron-600 dark:text-saffron-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                        Daily Verse
                      </button>
                      <button onClick={handleSavedClick} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-charcoal-50 dark:hover:bg-charcoal-800/50 text-charcoal-700 dark:text-charcoal-200 font-medium transition-all active:scale-[0.98]">
                        <span className="p-2 rounded-lg bg-saffron-100/50 dark:bg-saffron-900/20 text-saffron-600 dark:text-saffron-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </span>
                        Saved {user && bookmarks?.length > 0 && <span className="ml-auto bg-saffron-500 text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm">{bookmarks.length}</span>}
                      </button>
                      <button onClick={() => handleNavClick('/about')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-charcoal-50 dark:hover:bg-charcoal-800/50 text-charcoal-700 dark:text-charcoal-200 font-medium transition-all active:scale-[0.98]">
                        <span className="p-2 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        About
                      </button>
                      <button onClick={() => handleNavClick('/donate')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-charcoal-50 dark:hover:bg-charcoal-800/50 text-charcoal-700 dark:text-charcoal-200 font-medium transition-all active:scale-[0.98]">
                        <span className="p-2 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </span>
                        Support
                      </button>
                      <button onClick={() => handleNavClick('/feedback')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-charcoal-50 dark:hover:bg-charcoal-800/50 text-charcoal-700 dark:text-charcoal-200 font-medium transition-all active:scale-[0.98]">
                        <span className="p-2 rounded-lg bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-600 dark:text-charcoal-400">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </span>
                        Feedback
                      </button>
                      {user && (
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-medium transition-all active:scale-[0.98] mt-2"
                        >
                          <span className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                          </span>
                          Sign Out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </header>
            )
}