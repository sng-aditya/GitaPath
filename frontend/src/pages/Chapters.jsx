import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Chapters() {
  const navigate = useNavigate()

  const chapters = [
    { number: 1, sanskrit: "अर्जुनविषादयोग", english: "Arjuna Vishada Yoga", meaning: "The Yoga of Arjuna's Dejection", verses: 47 },
    { number: 2, sanskrit: "सांख्ययोग", english: "Sankhya Yoga", meaning: "The Yoga of Knowledge", verses: 72 },
    { number: 3, sanskrit: "कर्मयोग", english: "Karma Yoga", meaning: "The Yoga of Action", verses: 43 },
    { number: 4, sanskrit: "ज्ञानकर्मसंन्यासयोग", english: "Jnana Karma Sannyasa Yoga", meaning: "The Yoga of Knowledge and Renunciation of Action", verses: 42 },
    { number: 5, sanskrit: "कर्मसंन्यासयोग", english: "Karma Sannyasa Yoga", meaning: "The Yoga of Renunciation of Action", verses: 29 },
    { number: 6, sanskrit: "आत्मसंयमयोग", english: "Atmasamyama Yoga", meaning: "The Yoga of Self-Control", verses: 47 },
    { number: 7, sanskrit: "परमहंसविज्ञानयोग", english: "Paramahamsa Vijnana Yoga", meaning: "The Yoga of Knowledge and Realization", verses: 30 },
    { number: 8, sanskrit: "अक्षरब्रह्मयोग", english: "Aksara Brahma Yoga", meaning: "The Yoga of the Imperishable Brahman", verses: 28 },
    { number: 9, sanskrit: "राजविद्याराजगुह्ययोग", english: "Raja Vidya Guhya Yoga", meaning: "The Yoga of Royal Knowledge and Royal Secret", verses: 34 },
    { number: 10, sanskrit: "विभूतिविस्तारयोग", english: "Vibhuti Vistara Yoga", meaning: "The Yoga of Divine Manifestations", verses: 42 },
    { number: 11, sanskrit: "विश्वरूपदर्शनयोग", english: "Vishvarupa Darshana Yoga", meaning: "The Yoga of the Vision of the Universal Form", verses: 55 },
    { number: 12, sanskrit: "भक्तियोग", english: "Bhakti Yoga", meaning: "The Yoga of Devotion", verses: 20 },
    { number: 13, sanskrit: "क्षेत्रक्षेत्रज्ञविभागयोग", english: "Kshetra Kshetrajna Vibhaga Yoga", meaning: "The Yoga of Distinction between Field and Knower of Field", verses: 34 },
    { number: 14, sanskrit: "गुणत्रयविभागयोग", english: "Gunatraya Vibhaga Yoga", meaning: "The Yoga of Division of Three Gunas", verses: 27 },
    { number: 15, sanskrit: "पुरुषोत्तमप्राप्तियोग", english: "Purushottama Prapthi Yoga", meaning: "The Yoga of the Supreme Divine Personality", verses: 20 },
    { number: 16, sanskrit: "दैवासुरसंपद्विभागयोग", english: "Daivasura Sampad Vibhaga Yoga", meaning: "The Yoga of Division between Divine and Demoniacal Treasures", verses: 24 },
    { number: 17, sanskrit: "श्रद्धात्रयविभागयोग", english: "Shraddhatraya Vibhaga Yoga", meaning: "The Yoga of Division of Three Kinds of Faith", verses: 28 },
    { number: 18, sanskrit: "मोक्षसंन्यासयोग", english: "Moksha Sannyasa Yoga", meaning: "The Yoga of Liberation and Renunciation", verses: 78 }
  ]

  const handleChapterClick = (chapterNumber) => {
    navigate(`/reader?chapter=${chapterNumber}&verse=1`)
  }

  return (
    <div className="page-container">
      <div className="container">
        <div className="chapters-page">
          <div className="page-header">
            <h1>📚 All Chapters</h1>
            <p className="page-subtitle">
              The Bhagavad Gita contains 18 chapters with 700 verses of divine wisdom
            </p>
          </div>

          <div className="chapters-grid">
            {chapters.map((chapter) => (
              <div
                key={chapter.number}
                className="chapter-card"
                onClick={() => handleChapterClick(chapter.number)}
              >
                <div className="chapter-header">
                  <span className="chapter-number-badge">{chapter.number}</span>
                  <span className="chapter-label">Chapter</span>
                </div>
                <div className="chapter-content">
                  <div className="chapter-sanskrit">
                    {chapter.sanskrit}
                  </div>
                  <div className="chapter-english">
                    {chapter.english}
                  </div>
                  <div className="chapter-meaning">
                    {chapter.meaning}
                  </div>
                  <div className="chapter-footer">
                    <span className="chapter-stats">{chapter.verses} verses</span>
                    <span className="chapter-action">Begin Reading →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="chapters-summary">
            <h2>About the Bhagavad Gita</h2>
            <p>
              The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture 
              that is part of the epic Mahabharata. It is a conversation between Prince Arjuna 
              and Lord Krishna, who serves as his charioteer, at the start of the climactic 
              Kurukshetra War.
            </p>
            <p>
              The Gita addresses the moral and philosophical dilemmas faced by Arjuna, and by 
              extension, all of humanity. Through Krishna's teachings, it explores fundamental 
              questions about duty, righteousness, devotion, and the nature of reality itself.
            </p>
            <div className="gita-stats">
              <div className="stat">
                <span className="stat-number">18</span>
                <span className="stat-label">Chapters</span>
              </div>
              <div className="stat">
                <span className="stat-number">700</span>
                <span className="stat-label">Verses</span>
              </div>
              <div className="stat">
                <span className="stat-number">5000+</span>
                <span className="stat-label">Years Old</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}