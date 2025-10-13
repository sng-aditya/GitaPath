import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSnackbarContext } from '../components/SnackbarProvider'

export default function VerseOfTheDay({ user }) {
  const [dailyVerse, setDailyVerse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { showSuccess, showError } = useSnackbarContext()

  const chapterNames = {
    1: "Arjuna Vishada Yoga - The Yoga of Arjuna's Dejection",
    2: "Sankhya Yoga - The Yoga of Knowledge",
    3: "Karma Yoga - The Yoga of Action",
    4: "Jnana Karma Sannyasa Yoga - The Yoga of Knowledge and Renunciation of Action",
    5: "Karma Sannyasa Yoga - The Yoga of Renunciation of Action",
    6: "Atmasamyama Yoga - The Yoga of Self-Control",
    7: "Paramahamsa Vijnana Yoga - The Yoga of Knowledge and Realization",
    8: "Aksara Brahma Yoga - The Yoga of the Imperishable Brahman",
    9: "Raja Vidya Guhya Yoga - The Yoga of Royal Knowledge and Royal Secret",
    10: "Vibhuti Vistara Yoga - The Yoga of Divine Manifestations",
    11: "Vishvarupa Darshana Yoga - The Yoga of the Vision of the Universal Form",
    12: "Bhakti Yoga - The Yoga of Devotion",
    13: "Kshetra Kshetrajna Vibhaga Yoga - The Yoga of Distinction between Field and Knower of Field",
    14: "Gunatraya Vibhaga Yoga - The Yoga of Division of Three Gunas",
    15: "Purushottama Prapthi Yoga - The Yoga of the Supreme Divine Personality",
    16: "Daivasura Sampad Vibhaga Yoga - The Yoga of Division between Divine and Demoniacal Treasures",
    17: "Shraddhatraya Vibhaga Yoga - The Yoga of Division of Three Kinds of Faith",
    18: "Moksha Sannyasa Yoga - The Yoga of Liberation and Renunciation"
  }

  useEffect(() => {
    loadDailyVerse()
  }, [])

  useEffect(() => {
    if (dailyVerse && user) {
      checkIfBookmarked()
    }
  }, [dailyVerse, user])

  async function loadDailyVerse() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/gita/random`)
      setDailyVerse(res.data)
    } catch (err) {
      console.error('Failed to load daily verse:', err)
      showError('Failed to load daily verse')
    } finally {
      setLoading(false)
    }
  }

  async function checkIfBookmarked() {
    if (!user || !dailyVerse) return
    
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const bookmarked = res.data.bookmarks.some(
        b => b.chapter === dailyVerse.chapter && b.verse === dailyVerse.verse
      )
      setIsBookmarked(bookmarked)
    } catch (err) {
      console.error('Failed to check bookmark status:', err)
    }
  }

  async function toggleBookmark() {
    if (!user || !dailyVerse) return showError('Please login to bookmark verses')
    
    const token = localStorage.getItem('token')
    try {
      if (isBookmarked) {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/user/bookmark/${dailyVerse.chapter}/${dailyVerse.verse}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setIsBookmarked(false)
        showSuccess('Bookmark removed!')
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/bookmark/${dailyVerse.chapter}/${dailyVerse.verse}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setIsBookmarked(true)
        showSuccess('Verse bookmarked!')
      }
    } catch (err) {
      showError('Failed to update bookmark')
    }
  }

  function getHindiTranslation() {
    if (!dailyVerse) return 'कोई हिंदी अनुवाद उपलब्ध नहीं'
    if (dailyVerse.chinmay && dailyVerse.chinmay.ht) {
      return dailyVerse.chinmay.ht
    }
    return 'कोई हिंदी अनुवाद उपलब्ध नहीं'
  }

  function getEnglishTranslation() {
    if (!dailyVerse) return 'No English translation available'
    if (dailyVerse.siva && dailyVerse.siva.et) {
      return dailyVerse.siva.et
    }
    return 'No English translation available'
  }

  function getWordByWordTranslation() {
    if (!dailyVerse) return null
    if (dailyVerse.siva && dailyVerse.siva.ec) {
      return dailyVerse.siva.ec
    }
    return null
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="container">
          <div className="loading-state">
            <div className="sacred-symbol">🕉️</div>
            <p>Loading today's divine verse...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="verse-of-day-page">
          <div className="page-header">
            <h1>🌅 Verse of the Day</h1>
            <p className="page-subtitle">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {dailyVerse && (
            <div className="daily-verse-card">
              <div className="verse-header">
                <div className="verse-number">
                  Chapter {dailyVerse.chapter} • Verse {dailyVerse.verse}
                </div>
                <div className="chapter-name">
                  {chapterNames[dailyVerse.chapter]}
                </div>
              </div>

              <div className="verse-content">
                <div className="sanskrit-verse">
                  {dailyVerse.slok}
                </div>

                {dailyVerse.transliteration && (
                  <div className="transliteration">
                    {dailyVerse.transliteration}
                  </div>
                )}

                <div className="translations">
                  <div className="translation-card">
                    <h3>🌸 Hindi Translation</h3>
                    <p>{getHindiTranslation()}</p>
                    <span className="translation-author">— Swami Chinmayananda</span>
                  </div>

                  <div className="translation-card">
                    <h3>📖 English Translation</h3>
                    <p>{getEnglishTranslation()}</p>
                    <span className="translation-author">— Swami Sivananda</span>
                  </div>

                  {getWordByWordTranslation() && (
                    <div className="translation-card word-by-word">
                      <h3>🔤 Word by Word</h3>
                      <p>{getWordByWordTranslation()}</p>
                      <span className="translation-author">— Swami Sivananda</span>
                    </div>
                  )}
                </div>

                <div className="verse-actions">
                  <button 
                    className={`action-btn bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                    onClick={toggleBookmark}
                  >
                    {isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
                  </button>
                  <button 
                    className="action-btn share-btn"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${dailyVerse.slok}\\n\\n${getEnglishTranslation()}\\n\\n— Chapter ${dailyVerse.chapter}, Verse ${dailyVerse.verse}`
                      )
                      showSuccess('Verse copied to clipboard!')
                    }}
                  >
                    📋 Copy Verse
                  </button>
                  <button 
                    className="action-btn refresh-btn"
                    onClick={loadDailyVerse}
                  >
                    🔄 New Verse
                  </button>
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  )
}