import React from 'react'

export default function TestLanding() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🕉️ GitaPath Test</h1>
      <p>If you can see this, React is working!</p>
      <button style={{ 
        padding: '1rem 2rem', 
        background: '#ff6b35', 
        color: 'white', 
        border: 'none', 
        borderRadius: '25px',
        fontSize: '1rem',
        cursor: 'pointer'
      }}>
        Test Button
      </button>
    </div>
  )
}