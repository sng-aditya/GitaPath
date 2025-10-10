import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ user, progress, bookmarks, onLoadVerse }) => {
  const [stats, setStats] = useState({
    totalVerses: 700,
    readingGoal: 30, // verses per month
    monthlyProgress: 0,
    favoriteChapter: null
  });

  useEffect(() => {
    calculateStats();
  }, [progress, bookmarks]);

  const calculateStats = () => {
    if (!progress || !bookmarks) return;

    // Calculate monthly progress (rough estimation)
    const currentVersePosition = ((progress.current_chapter - 1) * 39) + progress.current_verse;
    const monthlyProgress = Math.min(currentVersePosition, stats.readingGoal);

    // Find favorite chapter (most bookmarked)
    const chapterCounts = {};
    bookmarks.forEach(bookmark => {
      chapterCounts[bookmark.chapter] = (chapterCounts[bookmark.chapter] || 0) + 1;
    });
    
    const favoriteChapter = Object.keys(chapterCounts).length > 0 
      ? Object.keys(chapterCounts).reduce((a, b) => 
          chapterCounts[a] > chapterCounts[b] ? a : b
        )
      : null;

    setStats(prev => ({
      ...prev,
      monthlyProgress,
      favoriteChapter: favoriteChapter ? parseInt(favoriteChapter) : null
    }));
  };

  const progressPercentage = progress ? 
    Math.min((((progress.current_chapter - 1) * 39) + progress.current_verse) / stats.totalVerses * 100, 100) 
    : 0;

  const streakStatus = progress?.streak_count >= 30 ? 'legendary' : 
                      progress?.streak_count >= 14 ? 'excellent' : 
                      progress?.streak_count >= 7 ? 'good' : 'starting';

  const achievements = [
    {
      id: 'first-read',
      title: 'First Steps',
      description: 'Read your first verse',
      unlocked: progress?.current_chapter >= 1,
      icon: '👶'
    },
    {
      id: 'week-streak',
      title: 'Weekly Devotee',
      description: 'Maintain a 7-day reading streak',
      unlocked: progress?.streak_count >= 7,
      icon: '🔥'
    },
    {
      id: 'chapter-complete',
      title: 'Chapter Master',
      description: 'Complete your first chapter',
      unlocked: progress?.current_chapter > 1,
      icon: '📖'
    },
    {
      id: 'bookmark-collector',
      title: 'Wisdom Collector',
      description: 'Save 10 favorite verses',
      unlocked: bookmarks?.length >= 10,
      icon: '⭐'
    },
    {
      id: 'month-streak',
      title: 'Dedicated Seeker',
      description: 'Maintain a 30-day reading streak',
      unlocked: progress?.streak_count >= 30,
      icon: '🏆'
    }
  ];

  const chapterNames = {
    1: "Vishada Yoga", 2: "Sankhya Yoga", 3: "Karma Yoga",
    4: "Gyan Karma Sanyasa Yoga", 5: "Karma Sanyasa Yoga",
    6: "Dhyana Yoga", 7: "Gyan Vigyan Yoga", 8: "Akshar Brahma Yoga",
    9: "Raja Vidya Yoga", 10: "Vibhuti Yoga", 11: "Vishwaroop Darshan Yoga",
    12: "Bhakti Yoga", 13: "Kshetra Kshetragna Vibhaga Yoga",
    14: "Gunatraya Vibhaga Yoga", 15: "Purushottama Yoga",
    16: "Daivasura Sampad Vibhaga Yoga", 17: "Shraddhatraya Vibhaga Yoga",
    18: "Moksha Sanyasa Yoga"
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h3>📊 Your Spiritual Journey Dashboard</h3>
        <p>Track your progress and celebrate your achievements</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{Math.round(progressPercentage)}%</div>
            <div className="stat-label">Overall Progress</div>
            <div className="stat-detail">
              Chapter {progress?.current_chapter || 1}, Verse {progress?.current_verse || 1}
            </div>
          </div>
        </div>

        <div className="stat-card streak">
          <div className="stat-icon">
            {progress?.streak_count >= 30 ? '🏆' : 
             progress?.streak_count >= 7 ? '🔥' : '⭐'}
          </div>
          <div className="stat-content">
            <div className="stat-value">{progress?.streak_count || 0}</div>
            <div className="stat-label">Day Streak</div>
            <div className={`stat-detail ${streakStatus}`}>
              {streakStatus === 'legendary' ? 'Legendary!' :
               streakStatus === 'excellent' ? 'Excellent!' :
               streakStatus === 'good' ? 'Great job!' : 'Keep going!'}
            </div>
          </div>
        </div>

        <div className="stat-card bookmarks">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value">{bookmarks?.length || 0}</div>
            <div className="stat-label">Saved Verses</div>
            <div className="stat-detail">
              {stats.favoriteChapter && `Favorite: Ch. ${stats.favoriteChapter}`}
            </div>
          </div>
        </div>

        <div className="stat-card goal">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{Math.round((stats.monthlyProgress / stats.readingGoal) * 100)}%</div>
            <div className="stat-label">Monthly Goal</div>
            <div className="stat-detail">{stats.monthlyProgress}/{stats.readingGoal} verses</div>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h4>🏅 Achievements</h4>
        <div className="achievements-grid">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <div className="achievement-title">{achievement.title}</div>
                <div className="achievement-description">{achievement.description}</div>
              </div>
              {achievement.unlocked && <div className="achievement-badge">✓</div>}
            </div>
          ))}
        </div>
      </div>

      {stats.favoriteChapter && (
        <div className="favorite-chapter">
          <h4>💎 Your Favorite Chapter</h4>
          <div className="favorite-card">
            <div className="favorite-number">Chapter {stats.favoriteChapter}</div>
            <div className="favorite-name">{chapterNames[stats.favoriteChapter]}</div>
            <button 
              className="btn-favorite"
              onClick={() => onLoadVerse(stats.favoriteChapter, 1)}
            >
              📖 Read Chapter
            </button>
          </div>
        </div>
      )}

      <div className="quick-actions">
        <h4>⚡ Quick Actions</h4>
        <div className="actions-grid">
          <button 
            className="action-card"
            onClick={() => onLoadVerse(1, 1)}
          >
            <div className="action-icon">🌱</div>
            <div className="action-text">Start from Beginning</div>
          </button>
          
          <button 
            className="action-card"
            onClick={() => progress && onLoadVerse(progress.current_chapter, progress.current_verse)}
          >
            <div className="action-icon">📖</div>
            <div className="action-text">Continue Reading</div>
          </button>
          
          <button 
            className="action-card"
            onClick={() => onLoadVerse(Math.floor(Math.random() * 18) + 1, 1)}
          >
            <div className="action-icon">🎲</div>
            <div className="action-text">Random Chapter</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;