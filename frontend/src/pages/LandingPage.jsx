import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config'
import { useSnackbarContext } from '../components/SnackbarProvider'
import StartReadingModal from '../components/StartReadingModal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function LandingPage({ onLogin, user, showLoginModal, setShowLoginModal, showSignupModal, setShowSignupModal, onBookmarkVerse, isBookmarked }) {
  const navigate = useNavigate()
  const [verse, setVerse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [showStartModal, setShowStartModal] = useState(false)
  const [startLoading, setStartLoading] = useState(false)
  const { showSuccess } = useSnackbarContext()

  useEffect(() => {
    document.title = 'श्रीमद् भगवद गीता हिंदी अनुवाद | Chapters, Shlok, Meaning - Bhagavad Gita Online';
    loadDailyVerse()
    if (user) {
      loadProgress()
    }
  }, [user])

  async function loadProgress() {
    if (!user) return
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${config.API_BASE_URL}/api/user/progress`, {
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
      let dailyVerseData;

      if (user) {
        // Get personalized daily verse for logged-in users
        const token = localStorage.getItem('token')
        const res = await axios.get(`${config.API_BASE_URL}/api/user/verse-of-day`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        dailyVerseData = res.data
      } else {
        // Get global daily verse for non-logged-in users
        const res = await axios.get(`${config.API_BASE_URL}/api/user/verse-of-day/global`)
        dailyVerseData = res.data
      }

      // Now fetch the actual verse content
      const verseRes = await axios.get(`${config.API_BASE_URL}/api/gita/${dailyVerseData.chapter}/${dailyVerseData.verse}`)
      setVerse(verseRes.data)
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
        showSuccess('Verse copied to clipboard! Share it with your friends.')
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

  function handleBeginReading() {
    if (progress && (progress.last_chapter || progress.current_chapter > 1 || progress.current_verse > 1)) {
      setShowStartModal(true)
    } else {
      handleStartFromBeginning()
    }
  }

  function handleStartFromBeginning() {
    setStartLoading(true)
    navigate('/reader?chapter=1&verse=1')
  }

  function handleContinueReading() {
    setStartLoading(true)
    const chapter = progress.last_chapter || progress.current_chapter || 1
    const verse = progress.last_verse || progress.current_verse || 1
    navigate(`/reader?chapter=${chapter}&verse=${verse}`)
  }

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-saffron-100/50 dark:bg-saffron-900/10 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="container-custom text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 text-sm font-medium animate-fade-in">
            ✨ Ancient Wisdom for Modern Life
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-charcoal-900 dark:text-white animate-slide-up">
            Find Clarity in <br />
            <span className="bg-gradient-to-r from-saffron-500 to-saffron-600 bg-clip-text text-transparent">The Bhagavad Gita</span>
          </h1>

          <p className="text-xl text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Transform your daily life with timeless teachings. Get personalized insights, modern interpretations, and practical wisdom delivered to you every day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {user ? (
              <>
                {progress && (progress.last_chapter || progress.current_chapter > 1 || progress.current_verse > 1) ? (
                  <>
                    <Button size="lg" onClick={() => setShowStartModal(true)}>
                      Continue Reading
                    </Button>
                    <Button variant="secondary" size="lg" onClick={handleStartFromBeginning}>
                      Start from Beginning
                    </Button>
                  </>
                ) : (
                  <Button size="lg" onClick={handleStartFromBeginning}>
                    Start Reading
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button size="lg" onClick={() => setShowSignupModal(true)}>
                  Start Your Journey
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate('/chapters')}>
                  Explore Chapters
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Daily Verse Section */}
      <section className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-4">Today's Verse</h2>
          <p className="text-charcoal-600 dark:text-charcoal-400">Your daily dose of wisdom and reflection</p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden">
          <div className="bg-gradient-to-r from-saffron-500/10 to-saffron-600/10 p-4 text-center border-b border-saffron-100 dark:border-charcoal-800">
            <span className="font-medium text-saffron-700 dark:text-saffron-400">
              Chapter {(verse || fallbackVerse).chapter} • Verse {(verse || fallbackVerse).verse}
            </span>
          </div>

          <div className="p-8 md:p-12 text-center">
            <div className="mb-8">
              <p className="text-2xl md:text-3xl font-devanagari leading-relaxed text-charcoal-900 dark:text-white mb-4">
                {(verse || fallbackVerse).slok}
              </p>
              <p className="text-lg text-charcoal-500 dark:text-charcoal-400 italic font-serif">
                {(verse || fallbackVerse).transliteration}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
              <div className="bg-sand-50 dark:bg-charcoal-800/50 p-6 rounded-xl">
                <h3 className="font-bold text-charcoal-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>📖</span> Translation
                </h3>
                <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
                  {(verse || fallbackVerse).siva?.et || (verse || fallbackVerse).purohit?.et || 'No translation available'}
                </p>
                <p className="text-sm text-charcoal-500 mt-4">— Swami Sivananda</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl">
                <h3 className="font-bold text-charcoal-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>💡</span> Modern Insight
                </h3>
                <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
                  {randomInterpretation}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button variant="secondary" onClick={shareVerse} className="gap-2">
                <span>📤</span> Share Quote
              </Button>
              <Button variant="secondary" onClick={getNewVerse} disabled={loading} className="gap-2">
                {loading ? 'Loading...' : <><span>🔄</span> New Verse</>}
              </Button>
              {user ? (
                <Button
                  variant={isBookmarked(verse?.chapter, verse?.verse) ? 'primary' : 'secondary'}
                  onClick={() => onBookmarkVerse(verse)}
                  className="gap-2"
                >
                  <span>{isBookmarked(verse?.chapter, verse?.verse) ? '♥' : '♡'}</span>
                  {isBookmarked(verse?.chapter, verse?.verse) ? 'Saved' : 'Save'}
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => setShowSignupModal(true)} className="gap-2">
                  <span>♡</span> Save (Sign Up)
                </Button>
              )}
            </div>
          </div>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-4">Why GitaPath?</h2>
          <p className="text-charcoal-600 dark:text-charcoal-400">Ancient wisdom designed for your modern lifestyle</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "📅",
              title: "Daily Wisdom",
              desc: "Receive a carefully selected verse each day with modern context and practical applications."
            },
            {
              icon: "🕉️",
              title: "Multi-language",
              desc: "Read in Sanskrit, Hindi, and English with accurate transliterations and translations."
            },
            {
              icon: "💡",
              title: "Modern Context",
              desc: "Understand how ancient teachings apply to contemporary challenges like stress and relationships."
            },
            {
              icon: "🎨",
              title: "Beautiful Cards",
              desc: "Share wisdom with beautiful, Instagram-ready quote cards that inspire your friends."
            },
            {
              icon: "🔖",
              title: "Personal Library",
              desc: "Save your favorite verses and build a collection of wisdom that resonates with you."
            },
            {
              icon: "📈",
              title: "Track Progress",
              desc: "Track your reading journey chapter by chapter and see your spiritual growth over time."
            }
          ].map((feature, index) => (
            <Card key={index} hover className="p-8 text-center group">
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
                {feature.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Start Reading Modal */}
      <StartReadingModal
        isOpen={showStartModal}
        onClose={() => setShowStartModal(false)}
        onContinue={handleContinueReading}
        onRestart={handleStartFromBeginning}
        progress={progress}
        loading={startLoading}
      />
    </div>
  )
}
