import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="global-footer">
      <div className="container">
        <div className="footer-content">
          <div className="sacred-symbol">🕉️</div>
          <div className="footer-text">
            <h3>सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः</h3>
            <p className="sanskrit-blessing">May all beings be happy, may all beings be healthy</p>
            <div className="divine-wisdom">
              <span>✨ Wisdom from the eternal Bhagavad Gita ✨</span>
              <span>🙏 Blessed be your spiritual journey 🙏</span>
            </div>
          </div>
          <div className="footer-links">
            <button className="footer-link" onClick={() => navigate('/about')}>About GitaPath</button>
            <button className="footer-link" onClick={() => navigate('/donate')}>Support Us</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Built with devotion and reverence • श्रीमद्भगवद्गीता • The Song of the Divine</p>
        </div>
      </div>
    </footer>
  )
}