import React from 'react';
import Button from './ui/Button';

const StartReadingModal = ({ isOpen, onClose, onContinue, onRestart, progress, loading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="bg-white dark:bg-charcoal-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-charcoal-100 dark:border-charcoal-800 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-charcoal-100 dark:border-charcoal-800 relative flex items-center justify-center bg-charcoal-50/50 dark:bg-charcoal-800/50">
          <span className="absolute left-6 text-xl font-bold text-saffron-600">ॐ</span>
          <h3 className="text-xl font-bold text-charcoal-900 dark:text-white">
            Continue Journey
          </h3>
          <button
            onClick={onClose}
            className="absolute right-6 text-charcoal-400 hover:text-charcoal-600 dark:hover:text-charcoal-200 transition-colors p-1 rounded-lg hover:bg-charcoal-100 dark:hover:bg-charcoal-700"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="bg-saffron-50 dark:bg-saffron-900/10 rounded-xl p-5 mb-6 border border-saffron-100 dark:border-saffron-900/20 text-center">
            <p className="text-sm text-charcoal-600 dark:text-charcoal-400 mb-1 font-medium">You were last reading</p>
            <div className="text-lg font-bold text-charcoal-900 dark:text-white flex items-baseline justify-center gap-2">
              <span className="text-saffron-600">Chapter {progress?.last_chapter || progress?.current_chapter}</span>
              <span className="text-charcoal-300 dark:text-charcoal-600">•</span>
              <span>Verse {progress?.last_verse || progress?.current_verse}</span>
            </div>
          </div>

          <p className="text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-2 text-center">
            Would you like to continue from where you left off, or start fresh from the beginning?
          </p>
        </div>

        {/* Actions */}
        <div className="p-6 pt-2 flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            onClick={onRestart}
            disabled={loading}
            className="flex-1 justify-center"
          >
            Start from Beginning
          </Button>
          <Button
            variant="primary"
            onClick={onContinue}
            disabled={loading}
            className="flex-1 justify-center"
          >
            {loading ? 'Loading...' : `Continue Reading`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartReadingModal;