import React from 'react';
import './NavigationControls.css';

const NavigationControls = ({ 
  currentChapter, 
  currentVerse, 
  onPrevious, 
  onNext, 
  onRandom,
  loading = false 
}) => {
  const isFirstVerse = currentChapter === 1 && currentVerse === 1;
  const isLastVerse = currentChapter === 18 && currentVerse === 78; // Chapter 18 has 78 verses

  return (
    <div className="navigation-controls">
      <div className="nav-section">
        <button 
          className="nav-btn prev-btn" 
          onClick={onPrevious}
          disabled={loading || isFirstVerse}
          title="Previous Verse"
        >
          <span className="nav-icon">⬅️</span>
          <span className="nav-text">Previous</span>
        </button>
        
        <div className="current-position">
          <span className="chapter-verse">
            Chapter {currentChapter} • Verse {currentVerse}
          </span>
          <div className="position-indicator">
            <div className="progress-dots">
              {Array.from({ length: Math.min(currentChapter, 5) }, (_, i) => (
                <div 
                  key={i} 
                  className={`dot ${i < currentChapter ? 'completed' : 'current'}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <button 
          className="nav-btn next-btn" 
          onClick={onNext}
          disabled={loading || isLastVerse}
          title="Next Verse"
        >
          <span className="nav-text">Next</span>
          <span className="nav-icon">➡️</span>
        </button>
      </div>
      
      <div className="random-section">
        <button 
          className="nav-btn random-btn" 
          onClick={onRandom}
          disabled={loading}
          title="Random Verse"
        >
          <span className="nav-icon">🎲</span>
          <span className="nav-text">Random Verse</span>
          {loading && <div className="loading-spinner"></div>}
        </button>
      </div>
    </div>
  );
};

export default NavigationControls;