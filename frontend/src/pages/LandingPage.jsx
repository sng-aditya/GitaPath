import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function LandingPage({ onLogin, user, showLoginModal, setShowLoginModal, showSignupModal, setShowSignupModal }) {
  console.log('LandingPage component loaded!')
  const [verse, setVerse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(null)

  // Login form state
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Signup form state
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)

  useEffect(() => {
    loadDailyVerse()
    if (user) {
      loadProgress()
    }
  }, [user])

  async function loadProgress() {
    if (!user) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('http://10.30.161.230:4000/api/user/progress', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProgress(res.data.progress)
    } catch (err) {
      console.error('Failed to load progress:', err)
    }
  }

  // Fallback verse if loading fails
  const fallbackVerse = {
    slok: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।',
    transliteration: 'yogasthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya',
    siva: { et: 'Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga.' },
    chapter: 2,
    verse: 48
  }

  async function loadDailyVerse() {
    try {
      const chapter = Math.floor(Math.random() * 18) + 1
      const verse = Math.floor(Math.random() * 40) + 1
      const res = await axios.get(`http://10.30.161.230:4000/api/gita/${chapter}/${verse}`)
      setVerse(res.data)
    } catch (error) {
      console.error('Error loading verse:', error)
      setVerse({
        slok: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।',
        transliteration: 'yogasthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya',
        siva: { et: 'Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga.' },
        chapter: 2,
        verse: 48
      })
    }
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoginLoading(true)
    try {
      const res = await axios.post('http://10.30.161.230:4000/api/auth/login', {
        email: loginEmail,
        password: loginPassword
      })
      localStorage.setItem('token', res.data.token)
      
      // Get user data
      const userRes = await axios.get('http://10.30.161.230:4000/api/auth/me', {
        headers: { Authorization: `Bearer ${res.data.token}` }
      })
      
      onLogin(userRes.data.user)
      setShowLoginModal(false)
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed')
    }
    setLoginLoading(false)
  }

  async function handleSignup(e) {
    e.preventDefault()
    setSignupLoading(true)
    try {
      const res = await axios.post('http://10.30.161.230:4000/api/auth/signup', {
        name: signupName,
        email: signupEmail,
        password: signupPassword
      })
      localStorage.setItem('token', res.data.token)
      
      // Get user data
      const userRes = await axios.get('http://10.30.161.230:4000/api/auth/me', {
        headers: { Authorization: `Bearer ${res.data.token}` }
      })
      
      onLogin(userRes.data.user)
      setShowSignupModal(false)
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed')
    }
    setSignupLoading(false)
  }

  async function getNewVerse() {
    setLoading(true)
    await loadDailyVerse()
    setLoading(false)
  }

  function shareVerse() {
    if (navigator.share && verse) {
      navigator.share({
        title: 'Daily Wisdom from Bhagavad Gita',
        text: `${verse.slok}\n\n${verse.siva?.et || verse.purohit?.et}\n\n- Bhagavad Gita`,
        url: window.location.href
      })
    } else {
      const text = `${verse.slok}\n\n${verse.siva?.et || verse.purohit?.et}\n\n- Bhagavad Gita\n\nDiscover more at GitaPath`
      navigator.clipboard.writeText(text).then(() => {
        alert('Verse copied to clipboard! Share it with your friends.')
      })
    }
  }

  const interpretations = [
    "This verse reminds us that life itself is a battlefield where we must choose between right and wrong. In your daily work, family conflicts, or personal decisions, remember that every choice shapes your character.",
    "Just as Arjuna faced his moment of truth on the battlefield, we all face moments where we must stand up for our values. Whether it's speaking up in a meeting or making an ethical choice, courage defines us.",
    "The battlefield represents the challenges in our modern lives - workplace stress, relationship issues, or personal struggles. This verse teaches us to approach them with clarity and purpose.",
    "Like the warriors gathering for battle, we must prepare ourselves mentally and spiritually for life's challenges. Start each day with intention and face difficulties with determination."
  ]

  const randomInterpretation = interpretations[Math.floor(Math.random() * interpretations.length)]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Daily Wisdom from the Bhagavad Gita</h1>
          <p>Transform your daily life with timeless teachings. Get personalized insights, modern interpretations, and practical wisdom from the Bhagavad Gita delivered to you every day.</p>
          <div className="cta-buttons">
            {user ? (
              <>
                {progress ? (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => window.location.href = `/reader?chapter=${progress.last_chapter || progress.current_chapter}&verse=${progress.last_verse || progress.current_verse}`}
                  >
                    Continue Reading - Chapter {progress.last_chapter || progress.current_chapter}
                  </button>
                ) : (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => window.location.href = '/reader'}
                  >
                    Begin Reading
                  </button>
                )}
                <button 
                  className="btn btn-secondary" 
                  onClick={() => window.location.href = '/reader?chapter=1&verse=1'}
                >
                  Start from Beginning
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-primary" onClick={() => setShowSignupModal(true)}>Start Your Journey</button>
                <button className="btn btn-secondary" onClick={() => document.getElementById('daily-verse').scrollIntoView({behavior: 'smooth'})}>Today's Verse</button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Daily Verse Section */}
      <section className="daily-verse" id="daily-verse">
        <div className="container">
          <div className="section-title">
            <h2>Today's Verse</h2>
            <p>Your daily dose of wisdom and reflection</p>
          </div>
          
          <div className="daily-verse-card">
            <div className="verse-header">
              <div className="verse-number">
                Chapter {(verse || fallbackVerse).chapter} • Verse {(verse || fallbackVerse).verse}
              </div>
            </div>

            <div className="verse-content">
              <div className="sanskrit-verse">
                {(verse || fallbackVerse).slok}
              </div>

              <div className="transliteration">
                {(verse || fallbackVerse).transliteration}
              </div>

              <div className="translations">
                <div className="translation-card">
                  <h3>📖 English Translation</h3>
                  <p>{(verse || fallbackVerse).siva?.et || (verse || fallbackVerse).purohit?.et || 'No translation available'}</p>
                  <span className="translation-author">— Swami Sivananda</span>
                </div>

                <div className="translation-card">
                  <h3>💡 Modern Life Application</h3>
                  <p>{randomInterpretation}</p>
                </div>
              </div>

              <div className="verse-actions">
                <button className="btn btn-primary" onClick={shareVerse}>
                  <i className="fas fa-share-alt"></i> Share Quote
                </button>
                <button className="btn btn-secondary" onClick={getNewVerse} disabled={loading}>
                  {loading ? <div className="loading"></div> : <><i className="fas fa-refresh"></i> New Verse</>}
                </button>
                <button className="btn btn-secondary" onClick={() => setShowSignupModal(true)}>
                  <i className="fas fa-heart"></i> Save (Sign Up)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-title">
            <h2>Why GitaPath?</h2>
            <p>Ancient wisdom for modern living</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-calendar-day"></i>
              </div>
              <h3>Daily Wisdom</h3>
              <p>Receive a carefully selected verse each day with modern context and practical applications for your daily life.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-language"></i>
              </div>
              <h3>Multi-language Support</h3>
              <p>Read in Sanskrit, Hindi, and English with accurate transliterations and multiple translations from renowned scholars.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Modern Interpretations</h3>
              <p>Understand how ancient teachings apply to contemporary challenges like work stress, relationships, and personal growth.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-share-alt"></i>
              </div>
              <h3>Beautiful Share Cards</h3>
              <p>Share wisdom with beautiful, Instagram-ready quote cards that inspire your friends and family.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Personal Collection</h3>
              <p>Save your favorite verses and build a personal library of wisdom that resonates with your journey.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Progress Tracking</h3>
              <p>Track your reading journey chapter by chapter, maintain daily streaks, and see your spiritual growth over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <div className={`modal ${showLoginModal ? 'show' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Welcome Back</h2>
            <span className="close" onClick={() => setShowLoginModal(false)}>&times;</span>
          </div>
          <div className="modal-body">
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="form-submit" disabled={loginLoading}>
                {loginLoading ? <div className="loading"></div> : 'Sign In'}
              </button>
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
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="form-submit" disabled={signupLoading}>
                {signupLoading ? <div className="loading"></div> : 'Create Account'}
              </button>
              <div className="form-switch">
                Already have an account? <a onClick={() => {setShowSignupModal(false); setShowLoginModal(true)}}>Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  )
}