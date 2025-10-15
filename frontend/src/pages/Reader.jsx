import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSnackbarContext } from '../components/SnackbarProvider'
import ChapterChips from '../components/ChapterChips'
import NavigationControls from '../components/NavigationControls'
import ReadingProgress from '../components/ReadingProgress'
import BookmarkActions from '../components/BookmarkActions'
import Dashboard from '../components/Dashboard'
import RestartModal from '../components/RestartModal'
import ConfirmationModal from '../components/ConfirmationModal'

export default function Reader({ user, darkMode, bookmarks, onBookmarkVerse, isBookmarked: isBookmarkedProp }) {
  const [verse, setVerse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [selectedAuthor, setSelectedAuthor] = useState('chinmay') // Default to Swami Chinmayananda
  const [showTranslation, setShowTranslation] = useState('hindi') // Show Hindi by default
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [dailyVerse, setDailyVerse] = useState(null)
  const [showGoToVerse, setShowGoToVerse] = useState(false)
  const [goToChapter, setGoToChapter] = useState(1)
  const [goToVerseNum, setGoToVerseNum] = useState(1)
  const [showRestartModal, setShowRestartModal] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const { showSuccess, showError, showInfo } = useSnackbarContext()

  // Chapter names
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


  // Available authors - Simplified to key ones
  const authors = {
    chinmay: { name: 'Swami Chinmayananda', key: 'chinmay' },
    siva: { name: 'Swami Sivananda', key: 'siva' }
  }

  useEffect(() => {
    // Load saved author preference
    const savedAuthor = localStorage.getItem('preferredAuthor')
    if (savedAuthor && authors[savedAuthor]) {
      setSelectedAuthor(savedAuthor)
    }

    // Check URL parameters for direct navigation
    const urlParams = new URLSearchParams(window.location.search)
    const chapter = parseInt(urlParams.get('chapter'))
    const verse = parseInt(urlParams.get('verse'))

    if (chapter && verse) {
      loadVerse(chapter, verse, false)
    } else {
      loadLastReadVerse()
    }

    loadProgress()

    // Listen for navigation events from search
    const handleNavigateToVerse = (event) => {
      const { chapter, verse } = event.detail
      loadVerse(chapter, verse, true)
    }

    window.addEventListener('navigateToVerse', handleNavigateToVerse)

    return () => {
      window.removeEventListener('navigateToVerse', handleNavigateToVerse)
    }
  }, [])

  async function loadDailyVerse() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/gita/random`)
      setDailyVerse(res.data)
    } catch (err) {
      console.error('Failed to load daily verse:', err)
    }
  }

  useEffect(() => {
    // Check if current verse is bookmarked using the prop function
    if (verse && isBookmarkedProp) {
      const bookmarked = isBookmarkedProp(verse.chapter, verse.verse)
      setIsBookmarked(bookmarked)
    }
  }, [verse, bookmarks, isBookmarkedProp])

  async function loadRandom() {
    console.log('=== LOAD RANDOM VERSE ===')

    setLoading(true)

    const requestUrl = `${import.meta.env.VITE_API_BASE_URL}/api/gita/random`
    console.log('Request URL:', requestUrl)

    try {
      console.log('Sending random verse request')
      const res = await axios.get(requestUrl)

      console.log('Response status:', res.status)
      console.log('Response data:', res.data)

      if (res.data && res.data.chapter && res.data.verse) {
        console.log('Valid random response received:', {
          chapter: res.data.chapter,
          verse: res.data.verse,
          hasSlok: !!res.data.slok,
          hasTransliteration: !!res.data.transliteration
        })
        setVerse(res.data)
        showInfo(`Random verse: Chapter ${res.data.chapter}, Verse ${res.data.verse}`)
      } else {
        console.error('Invalid random response structure:', res.data)
        throw new Error('Invalid response data structure')
      }
    } catch (err) {
      console.error('=== RANDOM VERSE ERROR ===')
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      })
      showError(`Failed to load random verse: ${err.response?.data?.error || err.message}`)
    } finally {
      setLoading(false)
      console.log('=== LOAD RANDOM COMPLETE ===')
    }
  }

  async function loadNext() {
    if (!verse) {
      console.log('loadNext: No current verse available')
      return
    }

    console.log('=== LOAD NEXT VERSE ===')
    console.log('Current verse:', { chapter: verse.chapter, verse: verse.verse })

    setLoading(true)

    const requestUrl = `${import.meta.env.VITE_API_BASE_URL}/api/gita/next/${verse.chapter}/${verse.verse}`
    console.log('Request URL:', requestUrl)

    try {
      console.log('Sending request to:', requestUrl)
      const res = await axios.get(requestUrl)

      console.log('Response status:', res.status)
      console.log('Response data:', res.data)

      if (res.data && res.data.chapter && res.data.verse) {
        console.log('Valid response received:', {
          chapter: res.data.chapter,
          verse: res.data.verse,
          hasSlok: !!res.data.slok,
          hasTransliteration: !!res.data.transliteration
        })
        setVerse(res.data)
        showInfo(`Next: Chapter ${res.data.chapter}, Verse ${res.data.verse}`)
      } else {
        console.error('Invalid response structure:', res.data)
        throw new Error('Invalid response data structure')
      }
    } catch (err) {
      console.error('=== NEXT VERSE ERROR ===')
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      })
      showError(`Failed to load next verse: ${err.response?.data?.error || err.message}`)
    } finally {
      setLoading(false)
      console.log('=== LOAD NEXT COMPLETE ===')
    }
  }

  async function loadPrevious() {
    if (!verse) {
      console.log('loadPrevious: No current verse available')
      return
    }

    console.log('=== LOAD PREVIOUS VERSE ===')
    console.log('Current verse:', { chapter: verse.chapter, verse: verse.verse })

    setLoading(true)

    const requestUrl = `${import.meta.env.VITE_API_BASE_URL}/api/gita/previous/${verse.chapter}/${verse.verse}`
    console.log('Request URL:', requestUrl)

    try {
      console.log('Sending request to:', requestUrl)
      const res = await axios.get(requestUrl)

      console.log('Response status:', res.status)
      console.log('Response data:', res.data)

      if (res.data && res.data.chapter && res.data.verse) {
        console.log('Valid response received:', {
          chapter: res.data.chapter,
          verse: res.data.verse,
          hasSlok: !!res.data.slok,
          hasTransliteration: !!res.data.transliteration
        })
        setVerse(res.data)
        showInfo(`Previous: Chapter ${res.data.chapter}, Verse ${res.data.verse}`)
      } else {
        console.error('Invalid response structure:', res.data)
        throw new Error('Invalid response data structure')
      }
    } catch (err) {
      console.error('=== PREVIOUS VERSE ERROR ===')
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        statusText: err.response?.statusText
      })
      showError(`Failed to load previous verse: ${err.response?.data?.error || err.message}`)
    } finally {
      setLoading(false)
      console.log('=== LOAD PREVIOUS COMPLETE ===')
    }
  }

  async function continueReading() {
    if (!progress) return
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/gita/${progress.current_chapter}/${progress.current_verse}`)
      setVerse(res.data)
      setActiveTab('reader')
      showSuccess('Continued from where you left off!')
    } catch (err) {
      console.error(err)
      showError('Failed to continue reading')
    } finally {
      setLoading(false)
    }
  }

  async function startFresh() {
    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/gita/1/1`)
      setVerse(res.data)
      setActiveTab('reader')
      showInfo('Starting fresh from Chapter 1, Verse 1')
    } catch (err) {
      console.error(err)
      showError('Failed to start fresh')
    } finally {
      setLoading(false)
    }
  }

  async function loadLastReadVerse() {
    console.log('=== LOAD LAST READ VERSE ===')

    setLoading(true)

    try {
      // First try to get the user's progress
      const token = localStorage.getItem('token')
      if (token) {
        console.log('Fetching user progress to find last read verse')
        const progressRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        const progress = progressRes.data.progress
        console.log('User progress:', progress)

        if (progress) {
          // Prioritize last_chapter/last_verse, fallback to current_chapter/current_verse
          const chapter = progress.last_chapter || progress.current_chapter || 1
          const verse = progress.last_verse || progress.current_verse || 1
          
          const verseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/gita/${chapter}/${verse}`
          console.log('Loading last read verse from:', verseUrl)

          const verseRes = await axios.get(verseUrl)
          console.log('Last read verse loaded successfully:', verseRes.data)

          setVerse(verseRes.data)
          setLoading(false)
          showInfo(`Continuing from Chapter ${chapter}, Verse ${verse}`)
          return
        }
      }

      // Fallback: Load Chapter 1, Verse 1 for new users
      console.log('No progress found, loading Chapter 1, Verse 1 as default')
      const fallbackUrl = `${import.meta.env.VITE_API_BASE_URL}/api/gita/1/1`
      const fallbackRes = await axios.get(fallbackUrl)
      console.log('Default verse loaded successfully:', fallbackRes.data)

      setVerse(fallbackRes.data)
      setLoading(false)
      showInfo('Welcome! Starting from the beginning - Chapter 1, Verse 1')

    } catch (err) {
      console.error('Error loading last read verse:', err)
      showError('Failed to load verse. Please try again.')
      setLoading(false)
    }
  }

  async function loadProgress() {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/progress`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProgress(res.data.progress)
    } catch (err) {
      console.error(err)
    }
  }



  async function bookmark() {
    if (!verse) return showError('No verse selected')
    if (!user) return showError('Please login first')

    if (onBookmarkVerse) {
      try {
        await onBookmarkVerse(verse)
        if (isBookmarked) {
          showSuccess('📖 Bookmark removed!')
        } else {
          showSuccess('📖 Verse bookmarked successfully!')
        }
        // The bookmark state will be updated through the useEffect above
      } catch (err) {
        console.error('Bookmark error:', err)
        showError('Failed to update bookmark')
      }
    } else {
      // Fallback to old method
      const token = localStorage.getItem('token')
      if (!token) return showError('Please login first')

      try {
        if (isBookmarked) {
          await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/user/bookmark/${verse.chapter}/${verse.verse}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          showSuccess('📖 Bookmark removed!')
          setIsBookmarked(false)
        } else {
          await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/bookmark/${verse.chapter}/${verse.verse}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          })
          showSuccess('📖 Verse bookmarked successfully!')
          setIsBookmarked(true)
        }

      } catch (err) {
        console.error('Bookmark error:', err)
        showError('Failed to update bookmark')
      }
    }
  }

  async function saveProgress() {
    const token = localStorage.getItem('token')
    if (!token) return showError('Please login first')
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/progress`, {
        chapter: verse.chapter,
        verse: verse.verse
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      showSuccess('✅ Progress saved successfully!')
      loadProgress() // Refresh progress
    } catch (err) {
      showError('Failed to save progress')
    }
  }

  async function loadBookmarkedVerse(chapter, verseNum) {
    loadVerse(chapter, verseNum, true)
    setActiveTab('reader')
  }

  // Main verse loading function - optimized and centralized
  async function loadVerse(chapter, verseNum, showMessage = true) {
    if (loading) return; // Prevent multiple simultaneous loads

    setLoading(true)
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/gita/${chapter}/${verseNum}`)
      setVerse(res.data)

      // Update URL without page reload
      const newUrl = `/reader?chapter=${chapter}&verse=${verseNum}`
      window.history.pushState(null, '', newUrl)

      if (showMessage) {
        showInfo(`Chapter ${chapter}, Verse ${verseNum}`)
      }

      // Update reading progress
      updateProgress(chapter, verseNum)
    } catch (err) {
      console.error('Failed to load verse:', err)
      showError(`Failed to load Chapter ${chapter}, Verse ${verseNum}`)
    } finally {
      setLoading(false)
    }
  }

  // Legacy function for compatibility
  async function loadSpecificVerse(chapter, verseNum) {
    loadVerse(chapter, verseNum, false)
  }

  function handleChapterSelect(chapter) {
    showInfo(`Selected Chapter ${chapter}`)
  }

  function handleExportBookmarks(format) {
    showSuccess(`Bookmarks exported as ${format.toUpperCase()} file!`)
  }

  function handleImportBookmarks(importedBookmarks) {
    // Here you would typically send these to the backend
    console.log('Importing bookmarks:', importedBookmarks)
    showInfo(`Imported ${importedBookmarks.length} bookmarks`)
    loadBookmarks() // Refresh bookmarks
  }

  async function handleClearBookmarks() {
    setShowClearConfirm(true)
  }

  async function confirmClearBookmarks() {
    setShowClearConfirm(false)
    const token = localStorage.getItem('token')
    if (!token) return showError('Please login first')

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/user/bookmarks`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      showSuccess('All bookmarks cleared!')
      // Refresh bookmarks through parent component
      if (typeof loadBookmarks === 'function') {
        loadBookmarks()
      }
    } catch (err) {
      showError('Failed to clear bookmarks')
    }
  }

  function handleStartFromBeginning() {
    setShowRestartModal(true)
  }

  function handleConfirmRestart() {
    setShowRestartModal(false)
    loadVerse(1, 1, true)
    showInfo('Starting fresh from Chapter 1, Verse 1')
  }

  // Get verse count for a chapter (approximate counts for each chapter)
  function getChapterVerseCount(chapter) {
    const verseCounts = {
      1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28, 9: 34,
      10: 42, 11: 55, 12: 20, 13: 35, 14: 27, 15: 20, 16: 24, 17: 28, 18: 78
    };
    return verseCounts[chapter] || 50;
  }

  // Load specific verse
  function loadSpecificVerse(chapter, verse) {
    loadVerse(chapter, verse);
  }

  // Calculate reading progress based on current position
  function calculateProgress() {
    if (!verse) return 0;
    const totalVerses = 700; // Approximate total verses in Gita
    let completedVerses = 0;

    // Add verses from completed chapters
    for (let i = 1; i < verse.chapter; i++) {
      completedVerses += getChapterVerseCount(i);
    }

    // Add verses from current chapter
    completedVerses += verse.verse;

    return Math.round((completedVerses / totalVerses) * 100);
  }

  // Calculate completion percentage based on progress data
  function getCompletionPercentage() {
    if (!progress || !progress.current_chapter) return 0;
    
    const totalVerses = 700;
    let completedVerses = 0;
    
    // Add verses from completed chapters
    for (let i = 1; i < progress.current_chapter; i++) {
      completedVerses += getChapterVerseCount(i);
    }
    
    // Add current verse
    completedVerses += progress.current_verse || 1;
    
    return Math.round((completedVerses / totalVerses) * 100);
  }

  // Get user streak from progress data
  function getUserStreak() {
    return progress?.streak_count || 0;
  }

  // Update reading progress
  async function updateProgress(chapter, verse) {
    if (!user) return

    try {
      const token = localStorage.getItem('token')
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/progress`, {
        chapter,
        verse
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      console.error('Failed to update progress:', err)
    }
  }

  // Get current Hindi translation - Swami Ramsukhdas
  function getCurrentHindiTranslation() {
    if (!verse) return 'कोई हिंदी अनुवाद उपलब्ध नहीं';

    // Use Swami Ramsukhdas for Hindi
    if (verse.rams && verse.rams.ht) {
      return verse.rams.ht;
    }

    return 'कोई हिंदी अनुवाद उपलब्ध नहीं';
  }

  // Get current English translation - A.C. Bhaktivedanta Swami Prabhupada
  function getCurrentEnglishTranslation() {
    if (!verse) return 'No English translation available';

    // Use A.C. Bhaktivedanta Swami Prabhupada for English
    if (verse.prabhu && verse.prabhu.ec) {
      return verse.prabhu.ec;
    }

    return 'No English translation available';
  }

  // Get word-by-word English translation - from Sivananda
  function getWordByWordTranslation() {
    if (!verse) return null;

    // Use Sivananda for word-by-word if available
    if (verse.siva && verse.siva.ec) {
      return verse.siva.ec;
    }

    return null;
  }

  // Get Sanskrit commentary
  function getSanskritCommentary() {
    if (!verse) return null;

    // Priority: sankar -> others
    const sanskritPriority = ['sankar', 'ms', 'rams'];
    for (const authorKey of sanskritPriority) {
      if (verse[authorKey] && verse[authorKey].sc) {
        return verse[authorKey].sc;
      }
    }

    return null;
  }

  // Handle author change
  function handleAuthorChange(newAuthor) {
    setSelectedAuthor(newAuthor);
    localStorage.setItem('preferredAuthor', newAuthor);
    showInfo(`Switched to ${authors[newAuthor].name}'s translation`);
  }

  // Helper function to get chapter verse count
  function getChapterVerseCount(chapter) {
    const verseCounts = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78];
    return verseCounts[chapter - 1] || 47;
  }

  return (
    <div className="reading-main">
      {/* Progress Container */}
      <div className="sidebar-card">
        <div className="sidebar-title">
          📈 Your Progress
        </div>
        <div className="progress-stats">
          <div className="stat-item">
            <div className="stat-label">Completion</div>
            <div className="stat-value">{getCompletionPercentage()}%</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Streak</div>
            <div className="stat-value">🔥 {getUserStreak()} days</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Current</div>
            <div className="stat-value">
              {verse ? `Ch${verse.chapter}, V${verse.verse}` : (progress ? `Ch${progress.current_chapter}, V${progress.current_verse}` : 'Ch1, V1')}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Last Read</div>
            <div className="stat-value">
              {progress && progress.last_chapter ? `Ch${progress.last_chapter}, V${progress.last_verse}` : (progress ? `Ch${progress.current_chapter}, V${progress.current_verse}` : 'Ch1, V1')}
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>ॐ</div>
          <p>Loading verse...</p>
        </div>
      )}

      {verse && (
        <div className="daily-verse-card">
          {/* Verse Header */}
          <div className="verse-header">
            <div className="verse-number">
              Chapter {verse.chapter} • Verse {verse.verse}
            </div>
            <div className="chapter-name">
              {chapterNames[verse.chapter]}
            </div>
          </div>

          <div className="verse-content">
            {/* Sanskrit Text */}
            <div className="sanskrit-verse">
              {verse.slok}
            </div>

            {/* Transliteration */}
            {verse.transliteration && (
              <div className="transliteration">
                {verse.transliteration}
              </div>
            )}

            {/* Translation Section */}
            <div className="translation-section">
              <div className="translation-toggle">
                <button
                  className={showTranslation === 'hindi' ? 'active' : ''}
                  onClick={() => setShowTranslation('hindi')}
                >
                  🌸 Hindi
                </button>
                <button
                  className={showTranslation === 'english' ? 'active' : ''}
                  onClick={() => setShowTranslation('english')}
                >
                  📖 English
                </button>
                <button
                  className={showTranslation === 'both' ? 'active' : ''}
                  onClick={() => setShowTranslation('both')}
                >
                  🌍 Both
                </button>
              </div>

              {/* Hindi Translation */}
              {(showTranslation === 'hindi' || showTranslation === 'both') && (
                <div className="translation-content">
                  <div className="hindi-translation">
                    {getCurrentHindiTranslation()}
                  </div>
                  <span className="translation-author">
                    — Swami Ramsukhdas
                  </span>
                </div>
              )}

              {/* English Translation */}
              {(showTranslation === 'english' || showTranslation === 'both') && (
                <div className="translation-content">
                  <div className="english-translation">
                    {getCurrentEnglishTranslation()}
                  </div>
                  <span className="translation-author">
                    — A.C. Bhaktivedanta Swami Prabhupada
                  </span>
                </div>
              )}

              {/* Word by Word Translation */}
              {getWordByWordTranslation() && (showTranslation === 'english' || showTranslation === 'both') && (
                <div className="translation-content" style={{ marginTop: '20px', fontSize: '16px', fontStyle: 'italic' }}>
                  <strong>Word by Word:</strong> {getWordByWordTranslation()}
                  <div className="translation-author" style={{ marginTop: '8px' }}>
                    — Swami Sivananda
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="page-navigation">
            <button
              className="nav-button"
              onClick={loadPrevious}
              disabled={loading || (verse.chapter === 1 && verse.verse === 1)}
            >
              ← Previous
            </button>
            <button
              className="nav-button restart-btn"
              onClick={handleStartFromBeginning}
            >
              🔄 Restart
            </button>
            <button
              className={`nav-button bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={bookmark}
              disabled={!verse}
            >
              {isBookmarked ? '⭐ Saved' : '☆ Save'}
            </button>

            <button
              className="nav-button"
              onClick={loadNext}
              disabled={loading || (verse.chapter === 18 && verse.verse === 78)}
            >
              Next →
            </button>
          </div>



          {/* Progress Bar */}
          <div className="reading-progress-bar">
            <div
              className="progress-bar"
              style={{
                width: `${((verse.chapter - 1) * 100 + (verse.verse / getChapterVerseCount(verse.chapter) * 100)) / 18}%`
              }}
            />
            <span className="progress-text">
              {Math.round(((verse.chapter - 1) * 100 + (verse.verse / getChapterVerseCount(verse.chapter) * 100)) / 18)}% Complete
            </span>
          </div>
        </div>
      )}

      {!verse && !loading && (
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>ॐ</div>
          <h2>Welcome to GitaPath</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
            Begin your spiritual journey with the eternal wisdom of the Bhagavad Gita
          </p>
          <button className="nav-button-reading" onClick={loadLastReadVerse}>
            Start Reading
          </button>
        </div>
      )}

      {/* Restart Modal */}
      <RestartModal 
        isOpen={showRestartModal}
        onClose={() => setShowRestartModal(false)}
        onConfirm={handleConfirmRestart}
        loading={loading}
      />
      
      {/* Clear Bookmarks Confirmation */}
      <ConfirmationModal 
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClearBookmarks}
        title="Clear All Bookmarks"
        message="Are you sure you want to clear all bookmarks? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
      />
    </div>
  )
}
