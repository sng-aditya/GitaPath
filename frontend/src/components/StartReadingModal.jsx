import React from 'react';
import './StartReadingModal.css';

const StartReadingModal = ({ isOpen, onClose, onContinue, onRestart, progress, loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="start-reading-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>ॐ Continue Your Journey</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="progress-info">
            <p>You were last reading:</p>
            <div className="last-position">
              Chapter {progress?.last_chapter || progress?.current_chapter}, 
              Verse {progress?.last_verse || progress?.current_verse}
            </div>
          </div>
          
          <p className="modal-message">Would you like to continue from where you left off, or start fresh from the beginning?</p>
        </div>
        
        <div className="modal-actions">
          <button 
            className="btn btn-secondary" 
            onClick={onRestart}
            disabled={loading}
          >
            🌱 Start from Beginning
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onContinue}
            disabled={loading}
          >
            {loading ? 'Loading...' : `📖 Continue from Ch${progress?.last_chapter || progress?.current_chapter}, V${progress?.last_verse || progress?.current_verse}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartReadingModal;