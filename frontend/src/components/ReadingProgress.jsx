import React from 'react';
import './ReadingProgress.css';

const ReadingProgress = ({ progress, onContinueReading, onStartFresh, user }) => {
  if (!progress) {
    return (
      <div className="reading-progress">
        <div className="progress-header">
          <h3>🙏 Namaste, {user?.name}!</h3>
          <p className="welcome-message">Welcome to your spiritual journey with the Bhagavad Gita</p>
        </div>
        <div className="progress-actions">
          <button 
            className="btn btn-primary fresh-btn"
            onClick={onStartFresh}
          >
            🌱 Begin Your Journey
          </button>
        </div>
      </div>
    );
  }

  const totalChapters = 18;
  const totalVerses = 700; // Approximate total verses in Bhagavad Gita
  const currentVersePosition = ((progress.current_chapter - 1) * 39) + progress.current_verse; // Rough calculation
  const progressPercentage = Math.min((currentVersePosition / totalVerses) * 100, 100);

  const isNewUser = !progress.last_read_date;
  const lastReadDate = progress.last_read_date ? new Date(progress.last_read_date) : null;
  const daysSinceLastRead = lastReadDate ? 
    Math.floor((new Date() - lastReadDate) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="reading-progress">
      <div className="progress-header">
        <h3>📚 Welcome back, {user?.name}!</h3>
        {isNewUser ? (
          <p className="welcome-message">Begin your spiritual journey with Chapter 1, Verse 1</p>
        ) : (
          <p className="continue-message">
            Continue from Chapter {progress.current_chapter}, Verse {progress.current_verse}
          </p>
        )}
      </div>

      <div className="progress-stats">
        <div className="stat-card">
          <div className="stat-value">{progress.current_chapter}/18</div>
          <div className="stat-label">Chapters</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{progress.streak_count}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">{Math.round(progressPercentage)}%</div>
          <div className="stat-label">Complete</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-value">
            {daysSinceLastRead === 0 ? 'Today' : 
             daysSinceLastRead === 1 ? 'Yesterday' : 
             `${daysSinceLastRead} days ago`}
          </div>
          <div className="stat-label">Last Read</div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <span className="progress-text">{Math.round(progressPercentage)}% Complete</span>
      </div>

      <div className="progress-actions">
        {!isNewUser && (
          <button 
            className="btn btn-primary continue-btn"
            onClick={onContinueReading}
          >
            📖 Continue Reading
          </button>
        )}
        
        <button 
          className="btn btn-secondary fresh-btn"
          onClick={onStartFresh}
        >
          {isNewUser ? '🌱 Start Journey' : '🔄 Start Fresh'}
        </button>
      </div>

      {progress.streak_count > 0 && (
        <div className="streak-celebration">
          <div className="streak-emoji">
            {progress.streak_count >= 30 ? '🏆' : 
             progress.streak_count >= 14 ? '💎' : 
             progress.streak_count >= 7 ? '🔥' : '⭐'}
          </div>
          <span className="streak-message">
            {progress.streak_count >= 30 ? 'Amazing dedication! 30+ days!' :
             progress.streak_count >= 14 ? 'Two weeks strong!' :
             progress.streak_count >= 7 ? 'One week streak!' :
             `${progress.streak_count} day streak!`}
          </span>
        </div>
      )}
    </div>
  );
};

export default ReadingProgress;