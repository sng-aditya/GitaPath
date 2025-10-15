import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SimpleBookmarksModal.css';

const SimpleBookmarksModal = ({ isOpen, onClose, bookmarks, loading = false }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleReadVerse = (chapter, verse) => {
    onClose();
    navigate(`/reader?chapter=${chapter}&verse=${verse}`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="simple-bookmarks-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📖 My Bookmarks</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          {loading ? (
            <div className="loading-state">
              <div className="loading-icon">ॐ</div>
              <p>Loading bookmarks...</p>
            </div>
          ) : bookmarks && bookmarks.length > 0 ? (
            <div className="bookmarks-list">
              {bookmarks.map((bookmark) => (
                <div key={`${bookmark.chapter}-${bookmark.verse}`} className="bookmark-card">
                  <div className="bookmark-header">
                    <span className="verse-reference">
                      Chapter {bookmark.chapter}, Verse {bookmark.verse}
                    </span>
                  </div>
                  
                  <div className="bookmark-content">
                    <div className="sanskrit-text">
                      {bookmark.slok || 'Sanskrit text not available'}
                    </div>
                  </div>
                  
                  <button 
                    className="read-verse-btn"
                    onClick={() => handleReadVerse(bookmark.chapter, bookmark.verse)}
                  >
                    📖 Read Complete Verse
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h4>No Bookmarks Yet</h4>
              <p>Start reading and bookmark your favorite verses to see them here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleBookmarksModal;