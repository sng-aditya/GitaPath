import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="global-footer">
      <div className="container">
        <div className="footer-content">
          <div className="sacred-symbol">ॐ</div>
          <div className="footer-text">
            <h3>सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः</h3>
            <p className="sanskrit-blessing">May all beings be happy, may all beings be healthy</p>
          </div>
          <div className="footer-links">
            <button className="footer-link" onClick={() => navigate('/about')}>About GitaPath</button>
            <button className="footer-link" onClick={() => navigate('/donate')}>Support Us</button>
          </div>
        </div>
      </div>
    </footer>
  )
}