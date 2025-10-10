import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChapterChips.css';

const ChapterChips = ({ currentChapter, onChapterSelect, onVerseSelect }) => {
  const [selectedChapter, setSelectedChapter] = useState(currentChapter || 1);
  const [verses, setVerses] = useState([]);
  const [showVerses, setShowVerses] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChapters();
  }, []);

  async function loadChapters() {
    try {
      const res = await axios.get('http://10.30.161.230:4000/api/gita/chapters');
      setChapters(res.data);
    } catch (err) {
      console.error('Failed to load chapters:', err);
      // Fallback with chapter numbers only
      setChapters(Array.from({ length: 18 }, (_, i) => ({
        chapter_number: i + 1,
        verses_count: [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78][i]
      })));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setSelectedChapter(currentChapter || 1);
  }, [currentChapter]);

  const handleChapterClick = (chapterData) => {
    const chapterNum = chapterData.chapter_number;
    setSelectedChapter(chapterNum);
    // Generate verses for this chapter
    const verseCount = chapterData.verses_count;
    const chapterVerses = Array.from({ length: verseCount }, (_, i) => i + 1);
    setVerses(chapterVerses);
    setShowVerses(true);
    onChapterSelect && onChapterSelect(chapterNum);
  };

  const handleVerseClick = (verse) => {
    onVerseSelect && onVerseSelect(selectedChapter, verse);
    setShowVerses(false);
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading chapters...</div>;
  }

  const selectedChapterData = chapters.find(ch => ch.chapter_number === selectedChapter);

  return (
    <div className="chapter-navigation">
      <div className="chapters-grid">
        {chapters.map(chapter => (
          <div
            key={chapter.chapter_number}
            className={`chapter-chip ${selectedChapter === chapter.chapter_number ? 'active' : ''}`}
            onClick={() => handleChapterClick(chapter)}
            title={chapter.name || `Chapter ${chapter.chapter_number}`}
          >
            <span className="chapter-number">{chapter.chapter_number}</span>
            <div className="chapter-info">
              <span className="chapter-name">
                {chapter.name ? chapter.name.substring(0, 30) + (chapter.name.length > 30 ? '...' : '') : `Chapter ${chapter.chapter_number}`}
              </span>
              <span className="verse-count">{chapter.verses_count} verses</span>
            </div>
          </div>
        ))}
      </div>

      {showVerses && selectedChapterData && (
        <div className="verses-section">
          <div className="verses-header">
            <h3>Chapter {selectedChapter} - {selectedChapterData.name || `Chapter ${selectedChapter}`}</h3>
            <button 
              className="close-verses" 
              onClick={() => setShowVerses(false)}
            >
              ×
            </button>
          </div>
          <div className="verses-grid">
            {verses.map(verse => (
              <div
                key={verse}
                className="verse-chip"
                onClick={() => handleVerseClick(verse)}
              >
                {verse}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterChips;