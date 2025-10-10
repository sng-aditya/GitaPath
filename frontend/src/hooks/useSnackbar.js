import { useState } from 'react';

export const useSnackbar = () => {
  const [snackbars, setSnackbars] = useState([]);

  const showSnackbar = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const snackbar = { id, message, type, duration };
    
    setSnackbars(prev => [...prev, snackbar]);
    
    // Auto-remove after duration
    setTimeout(() => {
      removeSnackbar(id);
    }, duration + 300); // Add extra time for animation
  };

  const removeSnackbar = (id) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  };

  const showSuccess = (message) => showSnackbar(message, 'success');
  const showError = (message) => showSnackbar(message, 'error');
  const showWarning = (message) => showSnackbar(message, 'warning');
  const showInfo = (message) => showSnackbar(message, 'info');

  return {
    snackbars,
    showSnackbar,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeSnackbar
  };
};