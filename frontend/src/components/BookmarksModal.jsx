import React from 'react'
import './BookmarksModal.css'

export default function BookmarksModal({ isOpen, onClose, bookmarks, onDeleteBookmark, onNavigateToVerse }) {
  if (!isOpen) return null

  return (
    <div className="bookmarks-modal" onClick={(e) => e.target.classList.contains('bookmarks-modal') && onClose()}>
      <div className="bookmarks-modal-content">
        <div className="bookmarks-modal-header">
          <h2>📖 My Bookmarks</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="bookmarks-modal-body">
          {bookmarks && bookmarks.length > 0 ? (
            <div className="bookmarks-grid">
              {bookmarks.map((bookmark) => (
                <div key={`${bookmark.chapter}-${bookmark.verse}`} className="bookmark-card">
                  <div className="bookmark-header">
                    <span className="bookmark-reference">
                      Chapter {bookmark.chapter}, Verse {bookmark.verse}
                    </span>
                    <button 
                      className="delete-bookmark"
                      onClick={() => onDeleteBookmark(bookmark.chapter, bookmark.verse)}
                      title="Remove bookmark"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="bookmark-content">
                    <div className="sanskrit-text">
                      {bookmark.slok}
                    </div>
                  </div>
                  
                  <button 
                    className="read-verse-btn"
                    onClick={() => onNavigateToVerse(bookmark.chapter, bookmark.verse)}
                  >
                    Read Full Verse
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-bookmarks">
              <div className="no-bookmarks-icon">📚</div>
              <h3>No Bookmarks Yet</h3>
              <p>Start bookmarking your favorite verses to see them here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}