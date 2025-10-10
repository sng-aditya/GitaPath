import React from 'react';
import './BookmarkActions.css';

const BookmarkActions = ({ bookmarks, onExport, onImport, onClear, loading = false }) => {
  const handleExportJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      bookmarks: bookmarks,
      totalBookmarks: bookmarks.length
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `gita-bookmarks-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    onExport && onExport('json');
  };

  const handleExportText = () => {
    let textContent = `📚 GitaPath - My Bookmarked Verses\n`;
    textContent += `📅 Exported on: ${new Date().toLocaleDateString()}\n`;
    textContent += `📖 Total Bookmarks: ${bookmarks.length}\n\n`;
    textContent += '═'.repeat(50) + '\n\n';
    
    bookmarks.forEach((bookmark, index) => {
      textContent += `${index + 1}. Chapter ${bookmark.chapter}, Verse ${bookmark.verse}\n`;
      textContent += `   Added: ${new Date(bookmark.created_at).toLocaleDateString()}\n`;
      textContent += '─'.repeat(40) + '\n';
    });
    
    const dataBlob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `gita-bookmarks-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    onExport && onExport('text');
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        if (importData.bookmarks && Array.isArray(importData.bookmarks)) {
          onImport && onImport(importData.bookmarks);
        } else {
          throw new Error('Invalid bookmark file format');
        }
      } catch (error) {
        console.error('Import error:', error);
        alert('Failed to import bookmarks. Please check the file format.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  return (
    <div className="bookmark-actions">
      <div className="actions-header">
        <h4>📋 Bookmark Management</h4>
        <p>{bookmarks.length} saved verses</p>
      </div>
      
      <div className="actions-grid">
        <div className="action-group">
          <h5>📤 Export</h5>
          <div className="action-buttons">
            <button 
              className="action-btn export-json"
              onClick={handleExportJSON}
              disabled={loading || bookmarks.length === 0}
              title="Export as JSON file"
            >
              <span className="btn-icon">📄</span>
              JSON
            </button>
            
            <button 
              className="action-btn export-text"
              onClick={handleExportText}
              disabled={loading || bookmarks.length === 0}
              title="Export as text file"
            >
              <span className="btn-icon">📝</span>
              Text
            </button>
          </div>
        </div>
        
        <div className="action-group">
          <h5>📥 Import</h5>
          <div className="action-buttons">
            <label className="action-btn import-btn" title="Import bookmarks from JSON file">
              <span className="btn-icon">📁</span>
              Import
              <input 
                type="file" 
                accept=".json"
                onChange={handleImport}
                disabled={loading}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>
        
        <div className="action-group">
          <h5>🗑️ Manage</h5>
          <div className="action-buttons">
            <button 
              className="action-btn clear-btn"
              onClick={onClear}
              disabled={loading || bookmarks.length === 0}
              title="Clear all bookmarks"
            >
              <span className="btn-icon">🗑️</span>
              Clear All
            </button>
          </div>
        </div>
      </div>
      
      {bookmarks.length === 0 && (
        <div className="empty-state">
          <p>📖 No bookmarks yet. Start reading and save your favorite verses!</p>
        </div>
      )}
    </div>
  );
};

export default BookmarkActions;