import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'

export default function Chapters() {
  const navigate = useNavigate()
  const [showVerseModal, setShowVerseModal] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState(null)

  useEffect(() => {
    document.title = 'भगवद गीता के 18 अध्याय | All Chapters of Bhagavad Gita Hindi English';
  }, []);

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

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter)
    setShowVerseModal(true)
  }

  const handleVerseSelect = (verseNumber) => {
    navigate(`/reader?chapter=${selectedChapter.number}&verse=${verseNumber}`)
    setShowVerseModal(false)
  }

  const getChapterVerseCount = (chapterNumber) => {
    const verseCounts = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 34, 27, 20, 24, 28, 78]
    return verseCounts[chapterNumber - 1] || 47
  }

  return (
    <div className="container-custom py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-charcoal-900 dark:text-white mb-4">All Chapters</h1>
        <p className="text-xl text-charcoal-600 dark:text-charcoal-400 max-w-2xl mx-auto">
          The Bhagavad Gita contains 18 chapters with 700 verses of divine wisdom, guiding you through every aspect of life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {chapters.map((chapter) => (
          <Card
            key={chapter.number}
            hover
            className="cursor-pointer group relative overflow-hidden"
            onClick={() => handleChapterClick(chapter)}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl font-bold text-saffron-500">{chapter.number}</span>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300 font-bold text-sm">
                  {chapter.number}
                </span>
                <span className="text-sm font-medium text-saffron-600 dark:text-saffron-400 uppercase tracking-wider">
                  {chapter.verses} Verses
                </span>
              </div>

              <h3 className="text-xl font-bold text-charcoal-900 dark:text-white mb-1 font-devanagari">
                {chapter.sanskrit}
              </h3>
              <h4 className="text-lg font-medium text-charcoal-700 dark:text-charcoal-200 mb-2">
                {chapter.english}
              </h4>
              <p className="text-charcoal-500 dark:text-charcoal-400 text-sm mb-6 line-clamp-2">
                {chapter.meaning}
              </p>

              <div className="flex items-center text-saffron-600 dark:text-saffron-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                Read Chapter →
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-sand-50 dark:bg-charcoal-800 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-6">About the Bhagavad Gita</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
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
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-saffron-500 mb-1">18</div>
            <div className="text-sm text-charcoal-500 dark:text-charcoal-400">Chapters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-saffron-500 mb-1">700</div>
            <div className="text-sm text-charcoal-500 dark:text-charcoal-400">Verses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-saffron-500 mb-1">5000+</div>
            <div className="text-sm text-charcoal-500 dark:text-charcoal-400">Years Old</div>
          </div>
        </div>
      </div>

      {/* Verse Selection Modal */}
      <Modal
        isOpen={showVerseModal}
        onClose={() => setShowVerseModal(false)}
        title={selectedChapter ? `Chapter ${selectedChapter.number}: ${selectedChapter.english}` : ''}
        maxWidth="max-w-4xl"
      >
        {selectedChapter && (
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-devanagari text-charcoal-900 dark:text-white mb-2">
                {selectedChapter.sanskrit}
              </h3>
              <p className="text-charcoal-600 dark:text-charcoal-400">
                {selectedChapter.meaning}
              </p>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
              {Array.from({ length: getChapterVerseCount(selectedChapter.number) }, (_, i) => i + 1).map(verseNum => (
                <button
                  key={verseNum}
                  onClick={() => handleVerseSelect(verseNum)}
                  className="aspect-square flex items-center justify-center rounded-lg bg-sand-50 dark:bg-charcoal-800 hover:bg-saffron-100 dark:hover:bg-saffron-900/30 text-charcoal-700 dark:text-charcoal-300 hover:text-saffron-700 dark:hover:text-saffron-300 font-medium transition-colors border border-transparent hover:border-saffron-200 dark:hover:border-saffron-800"
                >
                  {verseNum}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}