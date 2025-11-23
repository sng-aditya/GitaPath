import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config'
import { useSnackbarContext } from '../components/SnackbarProvider'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'

export default function Reader({ user, darkMode, bookmarks, onBookmarkVerse, isBookmarked: isBookmarkedProp }) {
  const [verse, setVerse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [showTranslation, setShowTranslation] = useState('both')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showRestartModal, setShowRestartModal] = useState(false)
  const { showSuccess, showError, showInfo } = useSnackbarContext()

  // Chapter names
  const chapterNames = {
    1: "Arjuna Vishada Yoga", 2: "Sankhya Yoga", 3: "Karma Yoga", 4: "Jnana Karma Sannyasa Yoga",
    5: "Karma Sannyasa Yoga", 6: "Atmasamyama Yoga", 7: "Paramahamsa Vijnana Yoga", 8: "Aksara Brahma Yoga",
    9: "Raja Vidya Guhya Yoga", 10: "Vibhuti Vistara Yoga", 11: "Vishvarupa Darshana Yoga", 12: "Bhakti Yoga",
    13: "Kshetra Kshetrajna Vibhaga Yoga", 14: "Gunatraya Vibhaga Yoga", 15: "Purushottama Prapthi Yoga",
    16: "Daivasura Sampad Vibhaga Yoga", 17: "Shraddhatraya Vibhaga Yoga", 18: "Moksha Sannyasa Yoga"
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const chapter = parseInt(urlParams.get('chapter'))
    const verse = parseInt(urlParams.get('verse'))

    if (chapter && verse) {
      loadVerse(chapter, verse, false)
    } else {
      loadLastReadVerse()
    }
    loadProgress()
  }, [window.location.search])

  useEffect(() => {
    if (verse && isBookmarkedProp) {
      setIsBookmarked(isBookmarkedProp(verse.chapter, verse.verse))
    }
  }, [verse, bookmarks, isBookmarkedProp])

  async function loadVerse(chapter, verseNum, showMessage = true) {
    if (loading) return
    setLoading(true)
    try {
      const res = await axios.get(`${config.API_BASE_URL}/api/gita/${chapter}/${verseNum}`)
      setVerse(res.data)
      const newUrl = `/reader?chapter=${chapter}&verse=${verseNum}`
      window.history.pushState(null, '', newUrl)
      if (showMessage) showInfo(`Chapter ${chapter}, Verse ${verseNum}`)
      updateProgress(chapter, verseNum)
    } catch (err) {
      console.error('Failed to load verse:', err)
      showError(`Failed to load Chapter ${chapter}, Verse ${verseNum}`)
    } finally {
      setLoading(false)
    }
  }

  async function loadLastReadVerse() {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const progressRes = await axios.get(`${config.API_BASE_URL}/api/user/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const progress = progressRes.data.progress
        if (progress) {
          const chapter = progress.last_chapter || progress.current_chapter || 1
          const verse = progress.last_verse || progress.current_verse || 1
          loadVerse(chapter, verse, false)
          return
        }
      }
      loadVerse(1, 1, false)
    } catch (err) {
      console.error('Error loading last read verse:', err)
      loadVerse(1, 1, false)
    }
  }

  async function loadProgress() {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const res = await axios.get(`${config.API_BASE_URL}/api/user/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setProgress(res.data.progress)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function updateProgress(chapter, verse) {
    if (!user) return
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${config.API_BASE_URL}/api/user/progress`, { chapter, verse }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      loadProgress()
    } catch (err) {
      console.error('Failed to update progress:', err)
    }
  }

  async function handleBookmark() {
    if (!verse) return showError('No verse selected')
    if (!user) return showError('Please login first')

    try {
      if (onBookmarkVerse) {
        await onBookmarkVerse(verse)
        showSuccess(isBookmarked ? '📖 Bookmark removed!' : '📖 Verse bookmarked!')
      }
    } catch (err) {
      showError('Failed to update bookmark')
    }
  }

  function handleNext() {
    if (verse.chapter === 18 && verse.verse === 78) return
    if (verse.verse < getChapterVerseCount(verse.chapter)) {
      loadVerse(verse.chapter, verse.verse + 1)
    } else {
      loadVerse(verse.chapter + 1, 1)
    }
  }

  function handlePrevious() {
    if (verse.chapter === 1 && verse.verse === 1) return
    if (verse.verse > 1) {
      loadVerse(verse.chapter, verse.verse - 1)
    } else {
      const prevChapter = verse.chapter - 1
      loadVerse(prevChapter, getChapterVerseCount(prevChapter))
    }
  }

  function getChapterVerseCount(chapter) {
    const verseCounts = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78]
    return verseCounts[chapter - 1] || 47
  }

  function getCompletionPercentage() {
    if (!progress || !progress.current_chapter) return 0
    const totalVerses = 700
    let completedVerses = 0
    for (let i = 1; i < progress.current_chapter; i++) {
      completedVerses += getChapterVerseCount(i)
    }
    completedVerses += progress.current_verse || 1
    return Math.round((completedVerses / totalVerses) * 100)
  }

  if (loading && !verse) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse text-4xl text-saffron-500">ॐ</div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8 pb-24">
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Sidebar - Progress & Stats */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6 sticky top-24">
            <h3 className="font-bold text-charcoal-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📈</span> Your Progress
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-charcoal-600 dark:text-charcoal-400">Completion</span>
                  <span className="font-medium text-charcoal-900 dark:text-white">{getCompletionPercentage()}%</span>
                </div>
                <div className="h-2 bg-charcoal-100 dark:bg-charcoal-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full transition-all duration-500"
                    style={{ width: `${getCompletionPercentage()}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-sand-50 dark:bg-charcoal-800 p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">🔥</div>
                  <div className="text-sm text-charcoal-500 dark:text-charcoal-400">Streak</div>
                  <div className="font-bold text-charcoal-900 dark:text-white">{progress?.streak_count || 0} days</div>
                </div>
                <div className="bg-sand-50 dark:bg-charcoal-800 p-3 rounded-lg text-center">
                  <div className="text-2xl mb-1">📖</div>
                  <div className="text-sm text-charcoal-500 dark:text-charcoal-400">Current</div>
                  <div className="font-bold text-charcoal-900 dark:text-white">
                    {verse ? `Ch${verse.chapter}` : '-'}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content - Verse Reader */}
        <div className="lg:col-span-9">
          {verse ? (
            <Card className="overflow-hidden">
              {/* Verse Header */}
              <div className="bg-gradient-to-r from-saffron-50 to-white dark:from-charcoal-800 dark:to-charcoal-900 p-6 border-b border-charcoal-100 dark:border-charcoal-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-sm font-medium text-saffron-600 dark:text-saffron-400 uppercase tracking-wider mb-1">
                    Chapter {verse.chapter} • Verse {verse.verse}
                  </div>
                  <h2 className="text-xl font-bold text-charcoal-900 dark:text-white">
                    {chapterNames[verse.chapter]}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={handleBookmark}>
                    <span className={`text-xl ${isBookmarked ? 'text-red-500' : 'text-charcoal-400'}`}>
                      {isBookmarked ? '♥' : '♡'}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="p-6 md:p-10">
                {/* Sanskrit Verse */}
                <div className="text-center mb-10">
                  <p className="text-2xl md:text-4xl font-devanagari leading-relaxed text-charcoal-900 dark:text-white mb-6">
                    {verse.slok}
                  </p>
                  <p className="text-lg text-charcoal-500 dark:text-charcoal-400 italic font-serif">
                    {verse.transliteration}
                  </p>
                </div>

                {/* Translation Controls */}
                <div className="flex justify-center gap-2 mb-8">
                  {['hindi', 'english', 'both'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setShowTranslation(lang)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${showTranslation === lang
                        ? 'bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 ring-1 ring-saffron-500'
                        : 'text-charcoal-600 dark:text-charcoal-400 hover:bg-charcoal-100 dark:hover:bg-charcoal-800'
                        }`}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Translations */}
                <div className="space-y-8 max-w-3xl mx-auto">
                  {(showTranslation === 'hindi' || showTranslation === 'both') && (
                    <div className="bg-sand-50 dark:bg-charcoal-800/50 p-6 rounded-xl border border-sand-200 dark:border-charcoal-700">
                      <div className="flex items-center gap-2 mb-3 text-saffron-600 dark:text-saffron-400 font-medium">
                        <span>🌸</span> Hindi Translation
                      </div>
                      <p className="text-lg text-charcoal-800 dark:text-charcoal-200 leading-relaxed font-devanagari">
                        {verse.rams?.ht || 'अनुवाद उपलब्ध नहीं है'}
                      </p>
                      <p className="text-sm text-charcoal-500 mt-3 text-right">— Swami Ramsukhdas</p>
                    </div>
                  )}

                  {(showTranslation === 'english' || showTranslation === 'both') && (
                    <div className="bg-white dark:bg-charcoal-800/30 p-6 rounded-xl border border-charcoal-100 dark:border-charcoal-700">
                      <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-medium">
                        <span>📖</span> English Translation
                      </div>
                      <p className="text-lg text-charcoal-800 dark:text-charcoal-200 leading-relaxed font-serif">
                        {verse.prabhu?.ec || 'Translation not available'}
                      </p>
                      <p className="text-sm text-charcoal-500 mt-3 text-right">— Srila Prabhupada</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="bg-charcoal-50 dark:bg-charcoal-900/50 p-4 border-t border-charcoal-100 dark:border-charcoal-800 flex justify-between items-center">
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={verse.chapter === 1 && verse.verse === 1}
                >
                  ← Previous
                </Button>

                <div className="hidden sm:block text-sm text-charcoal-500">
                  {Math.round(((verse.chapter - 1) * 100 + (verse.verse / getChapterVerseCount(verse.chapter) * 100)) / 18)}% of Gita
                </div>

                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={verse.chapter === 18 && verse.verse === 78}
                >
                  Next →
                </Button>
              </div>
            </Card>
          ) : (
            <div className="flex justify-center py-20">
              <div className="animate-pulse text-4xl text-charcoal-300">Loading...</div>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showRestartModal}
        onClose={() => setShowRestartModal(false)}
        title="Start from Beginning?"
      >
        <p className="text-charcoal-600 dark:text-charcoal-300 mb-6">
          Are you sure you want to restart your journey from Chapter 1, Verse 1? Your progress history will be preserved.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowRestartModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => {
            loadVerse(1, 1, true)
            setShowRestartModal(false)
          }}>
            Yes, Restart
          </Button>
        </div>
      </Modal>
    </div>
  )
}
