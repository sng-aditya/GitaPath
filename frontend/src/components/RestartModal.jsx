import React from 'react';
import './RestartModal.css';

const RestartModal = ({ isOpen, onClose, onConfirm, loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="restart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🔄 Restart Reading Journey</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="restart-icon">ॐ</div>
          <p>Are you sure you want to start reading from Chapter 1, Verse 1?</p>
          <p className="warning-text">This will take you to the beginning of the Bhagavad Gita.</p>
        </div>
        
        <div className="modal-actions">
          <button 
            className="btn btn-secondary" 
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Loading...' : '🌱 Start from Beginning'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestartModal;