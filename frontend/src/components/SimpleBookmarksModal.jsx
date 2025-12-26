import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './ui/Modal';
import Button from './ui/Button';

const SimpleBookmarksModal = ({ isOpen, onClose, bookmarks, loading = false, onDeleteBookmark }) => {
  const navigate = useNavigate();

  const handleReadVerse = (chapter, verse) => {
    onClose();
    navigate(`/reader?chapter=${chapter}&verse=${verse}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📖 My Bookmarks"
      maxWidth="max-w-2xl"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-charcoal-500 dark:text-charcoal-400">
          <div className="text-4xl animate-pulse mb-4">ॐ</div>
          <p>Loading bookmarks...</p>
        </div>
      ) : bookmarks && bookmarks.length > 0 ? (
        <div className="space-y-4">
          {bookmarks.map((bookmark) => (
            <div
              key={`${bookmark.chapter}-${bookmark.verse}`}
              className="bg-sand-50 dark:bg-charcoal-800 p-4 rounded-xl border border-sand-200 dark:border-charcoal-700 hover:border-saffron-300 dark:hover:border-saffron-700 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-bold text-saffron-600 dark:text-saffron-400 uppercase tracking-wider">
                  Chapter {bookmark.chapter}, Verse {bookmark.verse}
                </span>
                <button
                  onClick={() => onDeleteBookmark(bookmark.chapter, bookmark.verse)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                  title="Delete bookmark"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-lg font-devanagari text-charcoal-900 dark:text-white leading-relaxed">
                  {bookmark.slok || 'Sanskrit text not available'}
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center"
                onClick={() => handleReadVerse(bookmark.chapter, bookmark.verse)}
              >
                Read Complete Verse
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-4">📚</div>
          <h4 className="text-xl font-bold text-charcoal-900 dark:text-white mb-2">No Bookmarks Yet</h4>
          <p className="text-charcoal-600 dark:text-charcoal-400 max-w-xs">
            Start reading and bookmark your favorite verses to see them here.
          </p>
        </div>
      )}
    </Modal>
  );
};

export default SimpleBookmarksModal;