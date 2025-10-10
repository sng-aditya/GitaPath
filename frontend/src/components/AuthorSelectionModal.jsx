import React, { useState } from 'react';
import './AuthorSelectionModal.css';

const AuthorSelectionModal = ({ isOpen, onClose, onSelectAuthor, defaultAuthor = 'siva' }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(defaultAuthor);

  const authors = {
    siva: { 
      name: 'Swami Sivananda', 
      description: 'Clear, practical spiritual guidance with emphasis on self-realization',
      key: 'siva', 
      field: 'et' 
    },
    purohit: { 
      name: 'Shri Purohit Swami', 
      description: 'Poetic and devotional approach to the Gita\'s teachings',
      key: 'purohit', 
      field: 'et' 
    },
    chinmay: { 
      name: 'Swami Chinmayananda', 
      description: 'Philosophical depth with contemporary relevance',
      key: 'chinmay', 
      field: 'et' 
    },
    sankar: { 
      name: 'Adi Shankaracharya', 
      description: 'Traditional Advaita Vedanta interpretation',
      key: 'sankar', 
      field: 'et' 
    },
    raman: { 
      name: 'Swami Ramsukhdas', 
      description: 'Devotional and heart-centered approach',
      key: 'raman', 
      field: 'et' 
    },
    abhinav: { 
      name: 'Abhinavagupta', 
      description: 'Kashmir Shaivism perspective on the Gita',
      key: 'abhinav', 
      field: 'et' 
    }
  };

  const handleSubmit = () => {
    onSelectAuthor(selectedAuthor);
    // Save preference to localStorage
    localStorage.setItem('preferredAuthor', selectedAuthor);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="author-modal">
        <div className="modal-header">
          <h2>🕉️ Choose Your Guide</h2>
          <p>Select your preferred translator for the Bhagavad Gita verses</p>
        </div>
        
        <div className="authors-grid">
          {Object.entries(authors).map(([key, author]) => (
            <div
              key={key}
              className={`author-card ${selectedAuthor === key ? 'selected' : ''}`}
              onClick={() => setSelectedAuthor(key)}
            >
              <div className="author-name">{author.name}</div>
              <div className="author-description">{author.description}</div>
              <div className="selection-indicator">
                {selectedAuthor === key && <span>✓</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <p className="note">You can change this preference anytime in the reader</p>
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onClose}>
              Skip for Now
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Start Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorSelectionModal;