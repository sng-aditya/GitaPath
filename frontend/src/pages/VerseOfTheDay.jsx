import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../config'
import { useSnackbarContext } from '../components/SnackbarProvider'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function VerseOfTheDay({ user }) {
  const [dailyVerse, setDailyVerse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { showSuccess, showError } = useSnackbarContext()

  const chapterNames = {
    1: "Arjuna Vishada Yoga", 2: "Sankhya Yoga", 3: "Karma Yoga", 4: "Jnana Karma Sannyasa Yoga",
    5: "Karma Sannyasa Yoga", 6: "Atmasamyama Yoga", 7: "Paramahamsa Vijnana Yoga", 8: "Aksara Brahma Yoga",
    9: "Raja Vidya Guhya Yoga", 10: "Vibhuti Vistara Yoga", 11: "Vishvarupa Darshana Yoga", 12: "Bhakti Yoga",
    13: "Kshetra Kshetrajna Vibhaga Yoga", 14: "Gunatraya Vibhaga Yoga", 15: "Purushottama Prapthi Yoga",
    16: "Daivasura Sampad Vibhaga Yoga", 17: "Shraddhatraya Vibhaga Yoga", 18: "Moksha Sannyasa Yoga"
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
      const headers = user ? { Authorization: `Bearer ${localStorage.getItem('token')}` } : {}
      const res = await axios.get(`${config.API_BASE_URL}/api/gita/verse-of-day`, { headers })
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
      const res = await axios.get(`${config.API_BASE_URL}/api/user/bookmarks`, {
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
    if (!user) return showError('Please login to bookmark verses')

    const token = localStorage.getItem('token')
    try {
      if (isBookmarked) {
        await axios.delete(`${config.API_BASE_URL}/api/user/bookmark/${dailyVerse.chapter}/${dailyVerse.verse}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setIsBookmarked(false)
        showSuccess('Bookmark removed!')
      } else {
        const translation = getHindiTranslation() || getEnglishTranslation() || 'No translation available'
        await axios.post(`${config.API_BASE_URL}/api/user/bookmark/${dailyVerse.chapter}/${dailyVerse.verse}`, {
          slok: dailyVerse.slok,
          translation: translation
        }, {
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
    return dailyVerse?.chinmay?.ht || 'कोई हिंदी अनुवाद उपलब्ध नहीं'
  }

  function getEnglishTranslation() {
    return dailyVerse?.siva?.et || 'No English translation available'
  }

  function getWordByWordTranslation() {
    return dailyVerse?.siva?.ec || null
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-4xl text-saffron-500">ॐ</div>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-charcoal-900 dark:text-white mb-2">Verse of the Day</h1>
        <p className="text-charcoal-600 dark:text-charcoal-400">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {dailyVerse && (
        <Card className="max-w-4xl mx-auto overflow-hidden">
          <div className="bg-gradient-to-r from-saffron-500/10 to-saffron-600/10 p-4 text-center border-b border-saffron-100 dark:border-charcoal-800">
            <span className="font-medium text-saffron-700 dark:text-saffron-400">
              Chapter {dailyVerse.chapter} • Verse {dailyVerse.verse}
            </span>
            <div className="text-sm text-charcoal-500 dark:text-charcoal-400 mt-1">
              {chapterNames[dailyVerse.chapter]}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <p className="text-2xl md:text-3xl font-devanagari leading-relaxed text-charcoal-900 dark:text-white mb-6">
                {dailyVerse.slok}
              </p>
              {dailyVerse.transliteration && (
                <p className="text-lg text-charcoal-500 dark:text-charcoal-400 italic font-serif">
                  {dailyVerse.transliteration}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-sand-50 dark:bg-charcoal-800/50 p-6 rounded-xl border border-sand-200 dark:border-charcoal-700">
                <h3 className="font-bold text-charcoal-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🌸</span> Hindi Translation
                </h3>
                <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed font-devanagari">
                  {getHindiTranslation()}
                </p>
                <p className="text-sm text-charcoal-500 mt-3 text-right">— Swami Chinmayananda</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-charcoal-700">
                <h3 className="font-bold text-charcoal-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>📖</span> English Translation
                </h3>
                <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed font-serif">
                  {getEnglishTranslation()}
                </p>
                <p className="text-sm text-charcoal-500 mt-3 text-right">— Swami Sivananda</p>
              </div>
            </div>

            {getWordByWordTranslation() && (
              <div className="bg-charcoal-50 dark:bg-charcoal-800/30 p-6 rounded-xl border border-charcoal-100 dark:border-charcoal-700 mb-10">
                <h3 className="font-bold text-charcoal-900 dark:text-white mb-3 flex items-center gap-2">
                  <span>🔤</span> Word by Word
                </h3>
                <p className="text-charcoal-700 dark:text-charcoal-300 italic">
                  {getWordByWordTranslation()}
                </p>
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant={isBookmarked ? 'primary' : 'secondary'}
                onClick={toggleBookmark}
                className="gap-2"
              >
                <span>{isBookmarked ? '♥' : '♡'}</span>
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${dailyVerse.slok}\n\n${getEnglishTranslation()}\n\n— Chapter ${dailyVerse.chapter}, Verse ${dailyVerse.verse}`
                  )
                  showSuccess('Verse copied to clipboard!')
                }}
                className="gap-2"
              >
                <span>📋</span> Copy Verse
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
