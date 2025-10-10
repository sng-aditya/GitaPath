import React, { useState, useEffect } from 'react';
import './Snackbar.css';

const Snackbar = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose && onClose(), 300);
  };

  return (
    <div className={`snackbar ${type} ${isVisible ? 'show' : 'hide'}`}>
      <div className="snackbar-content">
        <span className="snackbar-message">{message}</span>
        <button className="snackbar-close" onClick={handleClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Snackbar;