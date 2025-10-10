import React, { useState, useEffect } from 'react';
import './DailyVerse.css';

const DailyVerse = ({ onLoadVerse, onDismiss }) => {
  const [dailyVerse, setDailyVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if daily verse was already dismissed today
    const dismissedDate = localStorage.getItem('dailyVerseDismissed');
    const today = new Date().toDateString();
    
    if (dismissedDate === today) {
      setDismissed(true);
      setLoading(false);
      return;
    }
    
    // Generate daily verse based on current date
    generateDailyVerse();
  }, []);

  const generateDailyVerse = () => {
    // Use current date as seed for consistent daily verse
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    // Create a pseudo-random but consistent verse selection
    const seed = dayOfYear + today.getFullYear();
    const chapter = (seed % 18) + 1;
    const verseMaxMap = {
      1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30, 8: 28,
      9: 34, 10: 42, 11: 55, 12: 20, 13: 34, 14: 27, 15: 20,
      16: 24, 17: 28, 18: 78
    };
    const verse = (seed % verseMaxMap[chapter]) + 1;
    
    setDailyVerse({ chapter, verse });
    setLoading(false);
  };

  const handleDismiss = () => {
    const today = new Date().toDateString();
    localStorage.setItem('dailyVerseDismissed', today);
    setDismissed(true);
    onDismiss && onDismiss();
  };

  const handleReadNow = () => {
    if (dailyVerse) {
      onLoadVerse(dailyVerse.chapter, dailyVerse.verse);
      handleDismiss();
    }
  };

  if (loading || dismissed) return null;

  return (
    <div className="daily-verse-notification">
      <div className="daily-verse-content">
        <div className="notification-header">
          <div className="daily-icon">🌅</div>
          <div className="daily-title">
            <h4>Daily Verse</h4>
            <p>Your spiritual guidance for today</p>
          </div>
          <button className="close-btn" onClick={handleDismiss}>×</button>
        </div>
        
        <div className="verse-info">
          <div className="verse-reference">
            Chapter {dailyVerse?.chapter} • Verse {dailyVerse?.verse}
          </div>
          <p className="verse-prompt">
            Start your day with wisdom from the Bhagavad Gita
          </p>
        </div>
        
        <div className="notification-actions">
          <button className="btn-daily read-now" onClick={handleReadNow}>
            📖 Read Now
          </button>
          <button className="btn-daily dismiss" onClick={handleDismiss}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyVerse;